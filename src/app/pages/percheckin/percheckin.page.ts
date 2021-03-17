import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';


import jsQR from 'jsqr';


// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();


var faceFile
var cardFile
var carFile
var carnumFile

var uploadFace
var uploadCardid
var uploadCar
var uploadCarnum

var downloadFaceURL
var downloadCardidURL
var downloadCarURL
var downloadCarnumURL


const timestamp = Date.now();



@Component({
  selector: 'app-percheckin',
  templateUrl: './percheckin.page.html',
  styleUrls: ['./percheckin.page.scss'],
})
export class PercheckinPage implements OnInit {


    //autocomplete
    companyCtrl: FormControl;
    filteredStates: Observable<any[]>;
    // question = 'Would you like to add "';
    question = 'ต้องการเพิ่มบริษัท "';
    companySelected
    companys: string[] = [] // states: string[] = ["Grab", "LINE MAN", "Foodpanda"];
  

  
    visitorForm: FormGroup;
    submitted = false;
    selectedValue: string;
    company = [];

    visitorPer
  
  
    vTypes = [
      { value: 'คนส่งอาหาร', viewValue: 'คนส่งอาหาร' },
      { value: 'ไปรษณีย์', viewValue: 'ไปรษณีย์' },
    ];

    visitorPople = "https://via.placeholder.com/600x330"
    visitorCard = "https://via.placeholder.com/600x330"
    visitorCarnum = "https://via.placeholder.com/600x330"
    visitorCar = "https://via.placeholder.com/600x330"

    

  scanActive = true
  scanResult = null
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any
  canvasElement: any
  canvasContext: any

  loading: HTMLIonLoadingElement

  constructor(private modalController: ModalController, private loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    this.companyCtrl = new FormControl();
    this.filteredStates = this.companyCtrl.valueChanges.pipe(
      startWith(""),
      map(com => (com ? this.filterStates(com) : this.companys.slice()))
    );
    console.log('autocomStates: ', this.companys);
   }

  ngOnInit() {

    this.visitorForm = this.formBuilder.group({
      vFullName: [''],
      vTaxId: [''],
      vAddress: [''],
      vBirthday: [''],
      vGender: [''],
      vType: [''],
      vCarnum: [''],
      floor: [''],
      housenum: [''],
      vNote: ['']
    })

    this.getCompany()
    this.startScan()



  }

  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement
    this.canvasElement = this.canvas.nativeElement
    this.canvasContext = this.canvasElement.getContext('2d')
  }

  async closeModal() {
    await this.modalController.dismiss();
  }


  async startScan() {
    const strem = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })
    this.videoElement.srcObject = strem
    this.videoElement.setAttribute('playsinline', true)
    this.videoElement.play()

    this.loading = await this.loadingCtrl.create({})
    await this.loading.present();

    requestAnimationFrame(this.scan.bind(this))
  }

  async scan() {
    console.log('SCAN')
    if (this.videoElement.readyState == this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss()
        this.loading = null
        this.scanActive = true
      }

      this.canvasElement.height = this.videoElement.videoHeight
      this.canvasElement.width = this.videoElement.videoWidth

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      )

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })
      console.log('code: ', code);

      if (code) {
        this.scanActive = false
        this.scanResult = code.data

        db.ref('preregister').orderByKey().equalTo(this.scanResult).on('value', (snapshot) => {

          this.visitorPer = snapshotToArray(snapshot)

          this.visitorPer = this.visitorPer[0]
          console.log(this.visitorPer.visitorFullname)
  
          let name = this.visitorPer.visitorFullname
          let texId = this.visitorPer.visitorTaxid
          let address = this.visitorPer.visitorAddress
          let birthday = this.visitorPer.visitorBirthday
          let gender = this.visitorPer.visitorGender

          this.visitorForm = this.formBuilder.group({
            vFullName: [name],
            vTaxId: [texId],
            vAddress: [address],
            vBirthday: [birthday],
            vGender: [gender],
            vType: [''],
            vCarnum: [''],
            floor: [''],
            housenum: [''],
            vNote: ['']
          })

          

          console.log('datatest >>>>', this.visitorPer);

        });


      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this))
        }

      }



    } else {
      requestAnimationFrame(this.scan.bind(this))
    }
  }

  stopScan() {
    this.scanActive = false
  }

  reset() {
    this.scanResult = null
    this.startScan()
  }

  fileFaceChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.visitorPople = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    faceFile = file

    console.log(faceFile);
  }

  saveFace() {
    uploadFace = storageRef.child('visitor_img/face' + this.visitorForm.value.vTaxID + '_' + timestamp).put(faceFile)
    uploadFace.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadFace is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadFace is running');
            break;
        }
      },
      (error) => {
        console.log('error', error);
      },
      () => {
        uploadFace.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          downloadFaceURL = downloadURL
        });
      }
    );
    
  }
  
  fileCardidChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.visitorCard = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    cardFile = file

    console.log(cardFile);
  }

  saveCardid() {
    uploadCardid = storageRef.child('visitor_img/cardid' + this.visitorForm.value.vTaxID + '_' + timestamp).put(cardFile)
    uploadCardid.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCardid is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadCardid is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadCardid is running');
            break;
        }
      },
      (error) => {
        console.log('error', error);

      },
      () => {
        uploadCardid.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          downloadCardidURL = downloadURL
        });
      }
    );
  }

  fileCarChange(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.visitorCar = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    carFile = file

    console.log(carFile);
  }

  saveCar(){
    uploadCar = storageRef.child('visitor_img/car' + this.visitorForm.value.vTaxID + '_' + timestamp).put(carFile)
    uploadCar.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCardid is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadCardid is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadCardid is running');
            break;
        }
      },
      (error) => {
        console.log('error', error);

      },
      () => {
        uploadCar.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          downloadCarURL = downloadURL
        });
      }
    );
  }

  fileCarnumChange(event){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.visitorCarnum = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    carnumFile = file

    console.log(carnumFile);
  }

  saveCarnum(){
    uploadCarnum = storageRef.child('visitor_img/carnum' + this.visitorForm.value.vTaxID + '_' + timestamp).put(carnumFile)
    uploadCarnum.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCardid is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadCardid is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadCardid is running');
            break;
        }
      },
      (error) => {
        console.log('error', error);

      },
      () => {
        uploadCarnum.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          downloadCarnumURL = downloadURL
        });
      }
    );
  }

  getCompany() {
    this.companys = []
    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>', snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)

      for (let i = 0; i < this.company.length; i++) {
        this.companys.push(this.company[i].name)
      }
      console.log('companys: ', this.companys);


    });
  }

  filterStates(name: string) {
    let results = this.companys.filter(com => com.toLowerCase().indexOf(name.toLowerCase()) === 0);

    if (results.length < 1) {
      results = [this.question + name + '"?'];
    }

    return results;
  }

  optionSelected(option) {
    console.log("optionSelected:", option.value);

    for (let i = 0; i < this.companys.length; i++) {
      if (this.companys[i] == option.value) {
        console.log("length>>", i);
        this.companySelected = i
      }
    }
    // this.companySelected = option.value
    if (option.value.indexOf(this.question) === 0) {
      let newCompany = option.value
        .substring(this.question.length)
        .split('"?')[0];
      
      
      console.log(this.companys.length);
      const timestamp = Date.now();
      let CurrentDate = moment(timestamp).format('l');

      //add new company to db
      db.ref('company/'+ this.companys.length).set({
        id: this.companys.length,
        name: newCompany,
        date: CurrentDate,
        time: timestamp
      })

      this.companyCtrl.setValue(newCompany);
      this.companys.push(newCompany);
      
    }
  }

  enter() {
    const value = this.companyCtrl.value;
    if (!this.companys.some(entry => entry === value)) {
      this.companys.push(value);
      console.log(this.companys);
    }
    setTimeout(() => this.companyCtrl.setValue(value));
  }

  submitvForm() {
    this.submitted = true;
    if (!this.visitorForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {

      console.log(this.visitorForm.value)
      // console.log(this.selected_company.name)


      var CurrentDate = moment(timestamp).format('YYYY-MM-DD');

      var CurrentTime = moment(timestamp).format('LT');

      console.log('starting timer...', CurrentDate);

    

      db.ref('visitor/' + this.visitorForm.value.vTaxId + '_' + timestamp).set({
        visitorFullname: this.visitorForm.value.vFullName,
        visiitorTaxid: this.visitorForm.value.vTaxId,
        visitorAddress: this.visitorForm.value.vAddress,
        visitorBirthday: this.visitorForm.value.vBirthday,
        visitorGender: this.visitorForm.value.vGender,
        visitorType: this.visitorForm.value.vType,
        houseNum: this.visitorForm.value.housenum,
        vistorCarid: this.visitorForm.value.vCarnum,
        vistorNote: this.visitorForm.value.vNote,
        visitorFloor: this.visitorForm.value.floor,
        company: this.companySelected,
        timestamp: timestamp,   // firebase.database.ServerValue.TIMESTAMP
        timeIn: CurrentTime,
        date: CurrentDate,
        visitorId: this.visitorForm.value.vTaxId + '_' + timestamp,
        status: "IN",
        visitorFaceurl: downloadFaceURL,
        visitorCardidurl: downloadCardidURL,
        visitorCarurl: downloadCarURL,
        visitorCarnumurl: downloadCarnumURL,
        timestampOut: '-',
      });
      
    }
  }


}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

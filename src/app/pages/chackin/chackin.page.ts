import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();

var uploadFace
var uploadCardid
var uploadCar
var uploadCarnum

var downloadFaceURL
var downloadCardidURL
var downloadCarURL
var downloadCarnumURL


@Component({
  selector: 'app-chackin',
  templateUrl: './chackin.page.html',
  styleUrls: ['./chackin.page.scss'],
})
export class ChackinPage implements OnInit {

  //face
  @ViewChild("videoFace", { static: false })
  public videoFace: ElementRef;
  @ViewChild("canvasFace", { static: false })
  public canvasFace: ElementRef;

  //cardID
  @ViewChild("videoCardid", { static: false })
  public videoCardid: ElementRef;
  @ViewChild("canvasCardid", { static: false })
  public canvasCardid: ElementRef;

  //carID
  @ViewChild("videoCar", { static: false })
  public videoCar: ElementRef;
  @ViewChild("canvasCar", { static: false })
  public canvasCar: ElementRef;

  //carNum
  @ViewChild("videoCarnum", { static: false })
  public videoCarnum: ElementRef;
  @ViewChild("canvasCarnum", { static: false })
  public canvasCarnum: ElementRef;

  public captures: Array<any> = [];

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


  vTypes = [
    { value: 'คนส่งอาหาร', viewValue: 'คนส่งอาหาร' },
    { value: 'ไปรษณีย์', viewValue: 'ไปรษณีย์' },
  ];

  fileFaceImg = "https://via.placeholder.com/600x330";
  fileCardidImg = "https://via.placeholder.com/600x330";
  fileCarImg = "https://via.placeholder.com/600x330";
  fileCarnumImg = "https://via.placeholder.com/600x330";
  progresFace: number = 0;
  progresCardid: number = 0;
  progresCar: number = 0;
  progresCarnum: number = 0;
  // selected_company = null

  // faceFile: any;



  constructor(private modalController: ModalController, public formBuilder: FormBuilder) {

    this.companyCtrl = new FormControl();
    this.filteredStates = this.companyCtrl.valueChanges.pipe(
      startWith(""),
      map(com => (com ? this.filterStates(com) : this.companys.slice()))
    );
    console.log('autocomStates: ', this.companys);

  }



  ngOnInit() {

    this.getCompany()

    this.visitorForm = this.formBuilder.group({
      vFullName: ['อธิวัฒน์ ทองมาก'],
      vTaxId: ['1459900715114'],
      vAddress: ['216 ซอยอนามัยงามเจริญ31 แขวท่าข้าม เขตบางขุนเทียน กรุงเทพฯ 10150'],
      vBirthday: ['19/10/2541'],
      vGender: ['ชาย'],
      vType: [''],
      vCarnum: [''],
      floor: [''],
      housenum: [''],
      vNote: ['']
    })


  }


  webcamFace() {
    document.getElementById('faceImg').hidden = true;
    document.getElementById('videoFace').hidden = false;

    var x = document.getElementById("webcamFace");
    if (x.textContent === "capture") {
      x.textContent = "webcam"
      this.captureFace();
      document.getElementById('faceImg').hidden = false;
      document.getElementById('videoFace').hidden = true;
      console.log('capture');



    } else {
      x.textContent = "capture"
      console.log("webcam");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 } }).then(stream => {
          try {
            this.videoFace.nativeElement.srcObject = stream;
          } catch (error) {
            this.videoFace.nativeElement.src = window.URL.createObjectURL(stream);
          }
          // this.video.nativeElement.srcObject = stream;
          this.videoFace.nativeElement.play();

        });
      }

    }


  }

  captureFace() {
    var context = this.canvasFace.nativeElement.getContext("2d").drawImage(this.videoFace.nativeElement, 0, 0, 300, 150);
    this.captures.push(this.canvasFace.nativeElement.toDataURL("image/jpeg"));
    this.fileFaceImg = this.canvasFace.nativeElement.toDataURL("image/jpeg");
    // this.video.nativeElement.pause();

    this.videoFace.nativeElement.pause();
    (this.videoFace.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.videoFace.nativeElement.srcObject = null;

    var faceFile = new File([this.dataURItoBlob(this.fileFaceImg)], 'img_1.jpg', { type: 'image/jpg' })

    var timestamp = Date.now();
    uploadFace = storageRef.child('visitor_img/face' + this.visitorForm.value.vTaxID + '_' + timestamp).put(faceFile)
    uploadFace.on('state_changed',
      (snapshot) => {

        this.progresFace = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress>>>>", this.progresFace);


        console.log('Upload is ' + this.progresFace + '% done');
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
    console.log(this.captures);
  }

  browseFace() {
    document.getElementById('faceImg').hidden = false;
    document.getElementById('videoFace').hidden = true;

    document.getElementById('inputFace').click();
  }

  browseFaceChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileFaceImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];


    console.log(file);
    var timestamp = Date.now();
    uploadFace = storageRef.child('visitor_img/face' + this.visitorForm.value.vTaxID + '_' + timestamp).put(file)
    uploadFace.on('state_changed',
      (snapshot) => {

        this.progresFace = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress>>>>", this.progresFace);


        console.log('Upload is ' + this.progresFace + '% done');
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

  ////////webcamCardid///////////
  webcamCardid() {
    document.getElementById('cardidImg').hidden = true;
    document.getElementById('videoCardid').hidden = false;

    var x = document.getElementById("webcamCardid");
    if (x.textContent === "capture") {
      x.textContent = "webcam";
      this.captureCardid();
      document.getElementById('cardidImg').hidden = false;
      document.getElementById('videoCardid').hidden = true;
      console.log('capture');



    } else {
      x.textContent = "capture";
      console.log("webcam");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 } }).then(stream => {
          try {
            this.videoCardid.nativeElement.srcObject = stream;
          } catch (error) {
            this.videoCardid.nativeElement.src = window.URL.createObjectURL(stream);
          }
          // this.video.nativeElement.srcObject = stream;
          this.videoCardid.nativeElement.play();

        });
      }

    }
  }

  captureCardid() {
    var context = this.canvasCardid.nativeElement.getContext("2d").drawImage(this.videoCardid.nativeElement, 0, 0, 300, 150);
    this.captures.push(this.canvasCardid.nativeElement.toDataURL("image/jpeg"));
    this.fileCardidImg = this.canvasCardid.nativeElement.toDataURL("image/jpeg");
    // this.video.nativeElement.pause();

    var cardidFile = new File([this.dataURItoBlob(this.fileCardidImg)], 'img_1.jpg', { type: 'image/jpg' })

    var timestamp = Date.now();
    uploadCardid = storageRef.child('visitor_img/cardid' + this.visitorForm.value.vTaxID + '_' + timestamp).put(cardidFile)
    uploadCardid.on('state_changed',
      (snapshot) => {

        this.progresCardid = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progressCardid >>>>", this.progresCardid);


        console.log('Upload is ' + this.progresCardid + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('uploadCardid is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('uploadCardid is running');
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

  browseCardid() {
    document.getElementById('cardidImg').hidden = false;
    document.getElementById('videoCardid').hidden = true;

    document.getElementById('inputCardid').click();
  }

  browseCardidChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileCardidImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    console.log('cardidFile >>>', file);
    var timestamp = Date.now();
    uploadCardid = storageRef.child('visitor_img/cardid' + this.visitorForm.value.vTaxID + '_' + timestamp).put(file)
    uploadCardid.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        this.progresCardid = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCardid is ' + this.progresCardid + '% done');
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

  /////////////////
  webcamCar() {
    document.getElementById('carImg').hidden = true;
    document.getElementById('videoCar').hidden = false;

    var x = document.getElementById("webcamCar");
    if (x.textContent === "capture") {
      x.textContent = "webcam";
      this.captureCar();
      document.getElementById('carImg').hidden = false;
      document.getElementById('videoCar').hidden = true;
      console.log('capture');



    } else {
      x.textContent = "capture";
      console.log("webcam");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 } }).then(stream => {
          try {
            this.videoCar.nativeElement.srcObject = stream;
          } catch (error) {
            this.videoCar.nativeElement.src = window.URL.createObjectURL(stream);
          }
          // this.video.nativeElement.srcObject = stream;
          this.videoCar.nativeElement.play();

        });
      }

    }
  }

  captureCar() {
    var context = this.canvasCar.nativeElement.getContext("2d").drawImage(this.videoCar.nativeElement, 0, 0, 300, 150);
    this.fileCarImg = this.canvasCar.nativeElement.toDataURL("image/jpeg");

    var carFile = new File([this.dataURItoBlob(this.fileCarImg)], 'img_1.jpg', { type: 'image/jpg' })

    var timestamp = Date.now();
    uploadCar = storageRef.child('visitor_img/car' + this.visitorForm.value.vTaxID + '_' + timestamp).put(carFile)
    uploadCar.on('state_changed',
      (snapshot) => {

        this.progresCar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progressCardid >>>>", this.progresCar);

        console.log('Upload is ' + this.progresCar + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadCar is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadCar is running');
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

    console.log(this.captures);
  }

  browseCar() {
    document.getElementById('carImg').hidden = false;
    document.getElementById('videoCar').hidden = true;

    document.getElementById('inputCar').click();
  }

  browseCarChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileCarImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    console.log('carFile >>>', file);
    var timestamp = Date.now();
    uploadCar = storageRef.child('visitor_img/car' + this.visitorForm.value.vTaxID + '_' + timestamp).put(file)
    uploadCar.on('state_changed',
      (snapshot) => {
        this.progresCar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCar is ' + this.progresCar + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('UploadCar is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('UploadCar is running');
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

  ////////////////////////
  webcamCarnum() {
    document.getElementById('carnumImg').hidden = true;
    document.getElementById('videoCarnum').hidden = false;

    var x = document.getElementById("webcamCarnum");
    if (x.textContent === "capture") {
      x.textContent = "webcam";
      this.captureCarnum();
      document.getElementById('carnumImg').hidden = false;
      document.getElementById('videoCarnum').hidden = true;
      console.log('capture');

    } else {
      x.textContent = "capture";
      console.log("webcam");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { width: 300, height: 150 } }).then(stream => {
          try {
            this.videoCarnum.nativeElement.srcObject = stream;
          } catch (error) {
            this.videoCarnum.nativeElement.src = window.URL.createObjectURL(stream);
          }
          // this.video.nativeElement.srcObject = stream;
          this.videoCarnum.nativeElement.play();

        });
      }

    }
  }

  captureCarnum() {
    var context = this.canvasCarnum.nativeElement.getContext("2d").drawImage(this.videoCarnum.nativeElement, 0, 0, 300, 150);
    this.captures.push(this.canvasCarnum.nativeElement.toDataURL("image/jpeg"));
    this.fileCarnumImg = this.canvasCarnum.nativeElement.toDataURL("image/jpeg");
    // this.video.nativeElement.pause();

    var carnumFile = new File([this.dataURItoBlob(this.fileCarnumImg)], 'img_1.jpg', { type: 'image/jpg' })

    var timestamp = Date.now();
    uploadCarnum = storageRef.child('visitor_img/carnum' + this.visitorForm.value.vTaxID + '_' + timestamp).put(carnumFile)
    uploadCarnum.on('state_changed',
      (snapshot) => {

        this.progresCarnum = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progressCardid >>>>", this.progresCarnum);

        console.log('Upload is ' + this.progresCarnum + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('uploadCarnum is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('uploadCarnum is running');
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

    console.log(this.captures);
  }

  browseCarnum() {
    document.getElementById('carnumImg').hidden = false;
    document.getElementById('videoCarnum').hidden = true;

    document.getElementById('inputCarnum').click();
  }

  browseCarnumChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileCarnumImg = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }

    let fileList: FileList = event.target.files;
    let file: File = fileList[0];

    console.log('carnumFile >>>',file);
    var timestamp = Date.now();
    uploadCarnum = storageRef.child('visitor_img/carnum' + this.visitorForm.value.vTaxID + '_' + timestamp).put(file)
    uploadCarnum.on('state_changed',
      (snapshot) => {
        this.progresCarnum = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('UploadCardid is ' + this.progresCarnum + '% done');
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
    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>', snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)

      this.companys = [];

      for (let i = 0; i < this.company.length; i++) {
        this.companys.push(this.company[i].name)
      }
      console.log('companys: ', this.companys);


    });
  }


  submitvForm() {
    this.submitted = true;
    if (!this.visitorForm.valid) {
      console.log('All fields are required.')
      return false;
    } else {

      console.log(this.visitorForm.value)
      // console.log(this.selected_company.name)

      var timestamp = Date.now();
      var CurrentDate = moment(timestamp).format('YYYY-MM-DD');

      var CurrentTime = moment(timestamp).format('LT');

      console.log('starting timer...', CurrentDate);


      console.log('submitnewCom>', this.companySelected);


      db.ref('visitor/' + this.visitorForm.value.vTaxId + '_' + timestamp).set({
        visitorFullname: this.visitorForm.value.vFullName,
        visitorTaxid: this.visitorForm.value.vTaxId,
        visitorAddress: this.visitorForm.value.vAddress,
        visitorBirthday: this.visitorForm.value.vBirthday,
        visitorGender: this.visitorForm.value.vGender,
        visitorType: this.visitorForm.value.vType,
        houseNum: this.visitorForm.value.housenum,
        visitorCarid: this.visitorForm.value.vCarnum,
        visitorNote: this.visitorForm.value.vNote,
        visitorFloor: this.visitorForm.value.floor,
        company: this.companySelected,
        timestampIn: timestamp,   // firebase.database.ServerValue.TIMESTAMP
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
      this.modalController.dismiss();

    }
  }



  filterStates(name: string) {
    let results = this.companys.filter(com => com.toLowerCase().indexOf(name.toLowerCase()) === 0);

    if (results.length < 1) {
      results = [this.question + name + '"?'];
    }

    return results;


  }

  optionSelected(option) {
    console.log("selectedItem:", option.value);

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
      db.ref('company/' + this.companys.length).set({
        id: this.companys.length,
        name: newCompany,
        date: CurrentDate,
        time: timestamp
      })

      this.companySelected = this.companys.length - 1;
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



  async closeModal() {
    await this.modalController.dismiss();
  }

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
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


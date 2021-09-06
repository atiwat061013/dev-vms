import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';


// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import * as moment from 'moment';


var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();



@Component({
  selector: 'app-chackout',
  templateUrl: './chackout.page.html',
  styleUrls: ['./chackout.page.scss'],
})
export class ChackoutPage implements OnInit {

  scanActive = true
  scanResult = null
  @ViewChild('video', { static: false }) video: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  videoElement: any
  canvasElement: any
  canvasContext: any

  company
  visitorData
  


  loading: HTMLIonLoadingElement


  constructor(private modalController: ModalController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>',snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)
    });


    this.startScan()
  }


  ngAfterViewInit() {
    this.videoElement = this.video.nativeElement
    this.canvasElement = this.canvas.nativeElement
    this.canvasContext = this.canvasElement.getContext('2d')
  }

  async closeModal() {
    await this.modalController.dismiss();

    this.video.nativeElement.pause();
    (this.video.nativeElement.srcObject as MediaStream).getVideoTracks()[0].stop();
    this.video.nativeElement.srcObject = null;
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
        // this.showQrToast()
        db.ref('visitor').orderByChild('visitorId').equalTo(this.scanResult).on('value', (snapshot) => {

     

          this.visitorData = snapshotToArray(snapshot)
          console.log(this.visitorData)
          this.getCompany();

          this.visitorData = this.visitorData[0]
          

          console.log('datatest >>>>', this.visitorData);

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

  allowOut() {
    const timestampnow = Date.now();
 

    var CurrentTime = moment(timestampnow).format('LT');
    console.log(CurrentTime);

    console.log( this.visitorData.visitorFullname);
    
    db.ref('visitor/' + this.visitorData.visitorId).update({
      status: "OUT",
      timeOut: CurrentTime,
      timestampOut: timestampnow
    });
    this.modalController.dismiss();
  }

  getCompany(){
    for(let k = 0; k < this.visitorData.length; k++){
      this.visitorData[k].company = this.getNameCompany(this.visitorData[k].company)
    }

    return console.log("company: ", this.visitorData);
    
  }


  getNameCompany(id){
    for (let i = 0; i < this.company.length; i++){
      if (this.company[i].id == id){
        console.log(this.company[i].name);
        return this.company[i].name
      
        
      }
    }
  }

  // Helper functions
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
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


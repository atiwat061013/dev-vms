import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import { ModalController } from '@ionic/angular';
import { ShowimgfacePage } from '../showimgface/showimgface.page';


var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();

@Component({
  selector: 'app-vmsinareamore',
  templateUrl: './vmsinareamore.page.html',
  styleUrls: ['./vmsinareamore.page.scss'],
})
export class VmsinareamorePage implements OnInit {
  
  @Input() data: string;


  private vInAreaMore
  tableStyle = 'material'
  customRowClass = false
  company

  CurrentDate
  nowDate
  isLoading = true;

  constructor(private modalController: ModalController) {
    
   }



  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.data);
    this.vInAreaMore = this.data


    let timestamp = Date.now();

    this.CurrentDate = moment(timestamp).format('YYYY-MM-DD');
    this.nowDate = moment().format('LL');

      //Convert timestamp to 'YYYY-MM-DD <br> h:mm a'
      for (var i = 0; i < this.vInAreaMore.length; i++) {
        var CurrentDate = moment(this.vInAreaMore[i].timestampIn).format('YYYY-MM-DD <br> h:mm a')
        // this.visitorList[i].timestamp = CurrentDate

        this.vInAreaMore[i].dateIn = CurrentDate

        
        var diff = timestamp - this.vInAreaMore[i].timestampIn;

        var msec = diff;
        var days = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= days * 1000 * 60 * 60 * 24;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;

        this.vInAreaMore[i].totalTime = days + ' day ' + hh + ' hours ' + mm + ' mins ';
      
      }

      this.isLoading = false;

    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    
    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>', snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)
    });
    this.getCompany()

  }

  async onActivate(event) {

    if (event.type == "click") {
      console.log(event.row);


      const modal = await this.modalController.create({
        component: ShowimgfacePage,
        componentProps: {
          visitorData: {visitorData :event.row},
        },
        cssClass: 'my-custom-modal-css'
      });
      return await modal.present();

    }

  }


  getCompany() {
    for (let k = 0; k < this.vInAreaMore.length; k++) {
      this.vInAreaMore[k].nameCompany = this.getNameCompany(this.vInAreaMore[k].company)
    }

    return console.log("company: ", this.vInAreaMore);

  }

  getNameCompany(id) {
    for (let i = 0; i < this.company.length; i++) {
      if (this.company[i].id == id) {
        return this.company[i].name
      }
    }
  }

  async closeModal() {
    await this.modalController.dismiss();
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

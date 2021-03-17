import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import { ModalController } from '@ionic/angular';


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


  constructor(private modalController: ModalController) {
    
   }



  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.data);
    this.vInAreaMore = this.data


    const timestamp = Date.now();

    this.CurrentDate = moment(timestamp).format('YYYY-MM-DD');
    this.nowDate = moment().format('LL');

  

      //Convert timestamp to 'YYYY-MM-DD <br> h:mm a'
      for (var i = 0; i < this.vInAreaMore.length; i++) {
        var CurrentDate = moment(this.vInAreaMore[i].timestamp).format('YYYY-MM-DD <br> h:mm a')
        // this.visitorList[i].timestamp = CurrentDate

        this.vInAreaMore[i].dateIn = CurrentDate

        if (this.vInAreaMore[i].timestampOut != "-") {
          var CurrentDateOut = moment(this.vInAreaMore[i].timestampOut).format('YYYY-MM-DD <br> h:mm a')
          this.vInAreaMore[i].timestampOut = CurrentDateOut
        }


      }

     

    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    
    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>', snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)
    });
    this.getCompany()

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

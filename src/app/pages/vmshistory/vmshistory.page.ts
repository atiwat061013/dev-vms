import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";


var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();

@Component({
  selector: 'app-vmshistory',
  templateUrl: './vmshistory.page.html',
  styleUrls: ['./vmshistory.page.scss'],
})



export class VmshistoryPage implements OnInit {

  data = [
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },


    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },
    {
      "visitorid": 1710511101011,
      "timein": "12:30",
      "name": "อธิวัฒน์ ทองมาก",
      "carnum": "ลฮ-2744",
      "timeout": "13:30",
      "housenum": "216",
      "timesum": "1ชม",
      "company": "Grab",
      "status": "OUT",
      "visitorimg": "https://via.placeholder.com/600x330"
    },

  ]

  CurrentDate
  nowDate
  visitorList

  private companies = this.data
  tableStyle ='bootstrap'
  customRowClass = false

  constructor() { 
    console.log(this.companies)
  }

  ngOnInit() {


    const timestamp = Date.now();

    this.CurrentDate = moment(timestamp).format('YYYY-MM-DD');
    this.nowDate = moment().format('LLLL');

    db.ref('visitor').orderByChild('date').equalTo(this.CurrentDate).on('value', (snapshot) => {
      this.visitorList = snapshotToArray(snapshot)

      console.log("visitorList>>> ",this.visitorList);
      

      //Convert timestamp to 'YYYY-MM-DD <br> h:mm a'
      for (var i = 0; i < this.visitorList.length; i++) {
        var CurrentDate = moment(this.visitorList[i].timestamp).format('YYYY-MM-DD <br> h:mm a')
        this.visitorList[i].timestamp = CurrentDate
      }

    });

  }


    switchStyle(){
    if (this.tableStyle == 'dark'){
      this.tableStyle = 'bootstrap'
    }else{
      this.tableStyle = 'dark'
    }
  }

  // getRowClass(row){
  //   const isMale = row.gender == 'male'
  //   if (!this.customRowClass){
  //     return{}
  //   }
  //   return{
  //     'male-row': isMale,
  //     '12:30-row': !isMale
  //   }
  // }

  async open(row){
    console.log(row)
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


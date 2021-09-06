import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';


// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import { SnapshottoarrayService } from 'src/app/services/snapshottoarray.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup } from '@angular/forms';



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

  @ViewChild(DatatableComponent) table: DatatableComponent;

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

  CurrentDate: any;
  nowDate: any;
  visitorList: any = [];

  company: any = [];
  isLoading = true;

  tableStyle = 'bootstrap'
  customRowClass = false

  searchData: string;
  temp = [];


  searchVisitor: FormGroup;

  vCompanys = [];

  constructor(private objtoarray: SnapshottoarrayService, public formBuilder: FormBuilder) {

  }

  ngOnInit() {

    db.ref('company').on('value', (snapshot) => {
      console.log('company>>>>>>', this.objtoarray.objToarray(snapshot))
      this.company = this.objtoarray.objToarray(snapshot)

      this.vCompanys = [];

      for (let i = 0; i < this.company.length; i++) {
        this.vCompanys.push(this.company[i].name)
      }
      console.log('companys: ', this.vCompanys);


    });

    
    this.searchVisitor = this.formBuilder.group({
      vFullName: [''],
      vCompany: [''],

    })


    db.ref('company').on('value', (snapshot) => {
      console.log('companyALL =>', this.objtoarray.objToarray(snapshot))
      this.company = this.objtoarray.objToarray(snapshot)
    });


    db.ref('visitor').on('value', (snapshot) => {
      this.visitorList = this.objtoarray.objToarray(snapshot)
      console.log(this.visitorList);

      this.isLoading = false
      this.temp = [...this.visitorList];
      for (var i = 0; i < this.visitorList.length; i++) {
        var CurrentDate = moment(this.visitorList[i].timestampIn).format('YYYY-MM-DD <br> h:mm a')
 
        this.visitorList[i].dateIn = CurrentDate

        if (this.visitorList[i].timestampOut != "-") {
          var CurrentDateOut = moment(this.visitorList[i].timestampOut).format('YYYY-MM-DD <br> h:mm a')
          this.visitorList[i].dateOut = CurrentDateOut
        }

        if (this.visitorList[i].status == "OUT") {
          console.log('out');
          console.log('in', this.visitorList[i].timestampIn, 'out', this.visitorList[i].timestampOut);


          let diff = this.visitorList[i].timestampOut - this.visitorList[i].timestampIn;

          let msec = diff;
          let days = Math.floor(msec / 1000 / 60 / 60 / 24);
          msec -= days * 1000 * 60 * 60 * 24;
          let hh = Math.floor(msec / 1000 / 60 / 60);
          msec -= hh * 1000 * 60 * 60;
          let mm = Math.floor(msec / 1000 / 60);
          msec -= mm * 1000 * 60;

          this.visitorList[i].totalTime = days + ' day ' + hh + ' hours ' + mm + ' mins ';

        }
      }
      this.getCompany();
    });




  }

  search() {
    // console.log('ssss', this.searchData);

    const valFullname = this.searchVisitor.value.vFullName.toLowerCase()

    const valCompany = this.searchVisitor.value.vCompany.toLowerCase()

    console.log('search: ', 'ชื่อ =>'+valFullname +' บริษัท =>'+valCompany);
    

    console.log('tmmp', this.temp);
    
    // filter our data
    const temps = this.temp.filter(item => {
   
      // if(item.visitorFullname != undefined && item.company != undefined){
      //   return item.visitorFullname.toLowerCase().indexOf(valFullname) !== -1 || !valFullname && 
      //   item.company.toLowerCase().indexOf(valCompany) !== -1 || !valCompany;
      //   }

      if(item.visitorFullname != undefined && item.company != undefined ){
        return (item.visitorFullname.toLowerCase().indexOf(valFullname) !== -1 || !valFullname) && (item.company.toLowerCase().indexOf(valCompany) !== -1 || !valCompany);

        }
        

    });

    // temps = this.temp.filter(item => {
  
    //   if(valFullname != '' && item.company != undefined){
    //     return item.visitorFullname.toLowerCase().indexOf(valFullname) !== -1 || !valFullname
    //   }

    // });

    console.log('completeSearch: ', temps);


    // update the rows
    this.visitorList = temps;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getCompany() {
    for (let k = 0; k < this.visitorList.length; k++) {
      this.visitorList[k].company = this.getNameCompany(this.visitorList[k].company)
    }

    return console.log("visitorMapcompany: ", this.visitorList);

  }



  getNameCompany(id) {
    for (let i = 0; i < this.company.length; i++) {
      if (this.company[i].id == id) {
        return this.company[i].name
      }
    }
  }


}
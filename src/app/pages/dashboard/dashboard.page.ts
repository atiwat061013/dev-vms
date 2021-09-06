import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChackinPage } from '../chackin/chackin.page';
import { ChackoutPage } from '../chackout/chackout.page';
import { ShowimgfacePage } from '../showimgface/showimgface.page';



declare var google;

// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import * as moment from 'moment';
import { PercheckinPage } from '../percheckin/percheckin.page';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { VmsinareamorePage } from '../vmsinareamore/vmsinareamore.page';
import { SnapshottoarrayService } from 'src/app/services/snapshottoarray.service';



var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private visitorList
  tableStyle = 'material'
  customRowClass = false

  searchs = [
    { value: 'visitorFullname', viewValue: 'ชื่อ' },
    { value: 'vistorCarid', viewValue: 'ทะเบียนรถ' },
    { value: 'company', viewValue: 'บริษัท' }
  ];


  inArea
  numIn
  dateIn = []

  inAreamore
  numInAreamore = 0
  dateInAreamore = []

  outArea
  numOut
  dateOut = []

  CurrentDate
  nowDate
  company
  companys = [
    {
      floor: 1,
      item: [{
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2FBNG.jpg?alt=media&token=b2c0fd87-297d-4070-a63e-9b23d4040074",
        "name": "BRAINERGY"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2FSeen.jpg?alt=media&token=3dd8f4e3-62ba-4eaf-b837-32249a9145d6",
        "name": "SEEN DIGITAL"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Fcloud.jpg?alt=media&token=b83132e2-8a72-4d17-9983-ccc4807fea00",
        "name": "Cloud HM"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Fbbtec-v2.jpg?alt=media&token=5f31d425-3d28-40c0-9f7e-992b69fc4def",
        "name": "BB Technology Company Limited"
      }]
    },
    {
      floor: 2,
      item: [{
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Finnnews.jpg?alt=media&token=aa43bdbf-1e8a-46e0-9c4c-275ac8a89441",
        "name": "INN Press Company Limited"
      }]
    },
    {
      floor: 3,
      item: [{
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Fuih-v2.jpg?alt=media&token=7f3533f2-025b-450a-8150-d9b5cf3a0ce9",
        "name": "United Information"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Futel-v2.jpg?alt=media&token=b602b412-7d02-4a4c-81f3-9bdabf5b1c80",
        "name": "United Telecom Sales and Services"
      }]
    },
    {
      floor: 4,
      item: [{
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Fyas.jpg?alt=media&token=c34649aa-73fa-4c73-b74c-fe95d03e1146",
        "name": "YA Sales and Services"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Ftopup.jpg?alt=media&token=ec33c54b-a9cd-4255-a8f6-84f88a66c6b4",
        "name": "Top UP For You Company Limited"
      }]
    },
    {
      floor: 5,
      item: [{
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Fbch-ventures.jpg?alt=media&token=3f9dc0ea-c0e9-4666-8505-cd911b642444",
        "name": "BCH VENTURES"
      },
      {
        "logo": "https://firebasestorage.googleapis.com/v0/b/seen-visitor-management.appspot.com/o/company_logo%2Frak.jpg?alt=media&token=d0172a08-f5e4-4a4d-98fa-467107d358cf",
        "name": "Rakbankered Company Limited"
      }]
    },
  ]
  selected_searchs = "visitorFullname"

  temp = [];

  // Map related
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  isLoading = true;

  map: any;

  constructor(private modalController: ModalController, private objtoarray: SnapshottoarrayService) {
  }

  ngOnInit() {


    db.ref('company').on('value', (snapshot) => {
      console.log('companyALL =>', snapshotToArray(snapshot))
      this.company = snapshotToArray(snapshot)
    });

    const timestamp = Date.now();

    this.CurrentDate = moment(timestamp).format('YYYY-MM-DD');
    this.nowDate = moment().format('LL');

    db.ref('visitor').orderByChild('date').equalTo(this.CurrentDate).on('value', (snapshot) => {


      // this.visitorList = snapshotToArray(snapshot)

      this.visitorList = this.objtoarray.objToarray(snapshot)


      this.temp = [...this.visitorList];

      console.log("visitorListTODAY>>> ", this.visitorList);


      //Convert timestamp to 'YYYY-MM-DD <br> h:mm a'
      for (var i = 0; i < this.visitorList.length; i++) {
        var CurrentDate = moment(this.visitorList[i].timestampIn).format('YYYY-MM-DD <br> h:mm a')
        // this.visitorList[i].timestamp = CurrentDate

        this.visitorList[i].dateIn = CurrentDate

        if (this.visitorList[i].timestampOut != "-") {
          var CurrentDateOut = moment(this.visitorList[i].timestampOut).format('YYYY-MM-DD <br> h:mm a')
          this.visitorList[i].timestampOut = CurrentDateOut
        }


      }

      this.getCompany()
      this.isLoading = false

    });


    this.getNumCueckIn()
    this.getNumCueckOut()
    this.getNumInAreaMore()
    
  }

  ionViewDidEnter() {
    this.loadMap();

  }

  onSelect(value){
    console.log(value);
    this.selected_searchs = value
  }



  getNumCueckIn() {
    //check number of visitor IN
    db.ref('visitor').orderByChild('status').equalTo("IN").on('value', (snapshot) => {
      this.inArea = snapshotToArray(snapshot)

      this.numIn = 0
      this.dateIn = []
      this.inArea.forEach(element => {
        const timestamp = Date.now();
        var CurrentDate = moment(timestamp).format('YYYY-MM-DD');

        if (element.date == CurrentDate) {
        this.dateIn.push(element)
      }
    });

      this.numIn = this.dateIn.length
      console.log("status IN>>> ", this.numIn);

    });
  }

  getNumCueckOut() {
    //check number of visitor OUT
    db.ref('visitor').orderByChild('status').equalTo("OUT").on('value', (snapshot) => {
      this.outArea = snapshotToArray(snapshot)
      // this.outArea = this.outArea.length
      console.log(this.outArea);

      this.numOut = 0
      this.dateOut = []
      for (let k = 0; k < this.outArea.length; k++) {
        const timestamp = Date.now();
        var CurrentDate = moment(timestamp).format('YYYY-MM-DD');
        if (this.outArea[k].date == CurrentDate) {
          this.dateOut.push(this.outArea[k].date)
        }

      }
      this.numOut = this.dateOut.length
      console.log("status OUT>>> ", this.numOut);
    });
  }


  
  getNumInAreaMore() {
    const timestamp = Date.now() - (86400000)
    
    console.log('timenow: ',timestamp);

    db.ref('visitor').orderByChild('timestampIn').endAt(timestamp).on('value', (snapshot) => {
      this.inAreamore = snapshotToArray(snapshot)
      console.log('inMore',this.inAreamore);

      this.numInAreamore = 0
      this.dateInAreamore = []
      this.inAreamore.forEach(element => {
          if (element.status == "IN") {
          this.dateInAreamore.push(element)
        }
      });

      this.numInAreamore = this.dateInAreamore.length
      console.log("status inAreamore>>> ", this.numInAreamore);
      console.log("status inAreamore>>> ",this.dateInAreamore);

    });

  }


  async showData() {
    const modal = await this.modalController.create({
      component: VmsinareamorePage,
      componentProps: {data : this.dateInAreamore},
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
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


  async opneModalPerChackin() {
    const modal = await this.modalController.create({
      component: PercheckinPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }


  async opneModalChackin() {
    const modal = await this.modalController.create({
      component: ChackinPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  async opneModalChackout() {
    const modal = await this.modalController.create({
      component: ChackoutPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  switchStyle() {
    if (this.tableStyle == 'dark') {
      this.tableStyle = 'bootstrap'
    } else {
      this.tableStyle = 'dark'
    }
  }

  // getRowClass(row) {
  //   const isMale = row.timein == 'male'
  //   if (!this.customRowClass) {
  //     return {}
  //   }
  //   return {
  //     'male-row': isMale,
  //     '12:30-row': !isMale
  //   }
  // }


  async open(row) {
    console.log(row)
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log("selected_searchs>>", this.selected_searchs);

    // filter our data
    const temp = this.temp.filter(item => {

      if (this.selected_searchs == "company") {
        return item.company.toLowerCase().indexOf(val) !== -1 || !val;
      } else if (this.selected_searchs == "visitorFullname") {
        return item.visitorFullname.toLowerCase().indexOf(val) !== -1 || !val;
      } else if (this.selected_searchs == "vistorCarid") {
        return item.visitorCarid.toLowerCase().indexOf(val) !== -1 || !val;
      }

    });

    // update the rows
    this.visitorList = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  loadMap() {
    let latLng = new google.maps.LatLng(13.787885399739247, 100.7293631416505);

    let mapOptions = {
      center: latLng,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

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

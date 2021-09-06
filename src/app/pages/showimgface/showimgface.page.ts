import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as moment from 'moment';

// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import { Router } from '@angular/router';

var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();

@Component({
  selector: 'app-showimgface',
  templateUrl: './showimgface.page.html',
  styleUrls: ['./showimgface.page.scss'],
})
export class ShowimgfacePage implements OnInit {

  @Input() visitorData: string;


  vData
  statu :boolean = false;
  exitNote:string;
  
  constructor(private router: Router ,private modalController: ModalController) { }

  

  ngOnInit() {
    this.vData = this.visitorData;
    console.log("test>>",this.vData.visitorData);

    if(this.vData.visitorData.status == 'IN'){
      this.statu = true
    }else if(this.vData.visitorData.status == 'OUT'){
      this.statu = false
    }
  }

  allowNoteOut(){
    const timestampnow = Date.now();
 
    var CurrentTime = moment(timestampnow).format('LT');
    console.log(CurrentTime);

    console.log( this.vData.visitorData.visitorId);
    
    db.ref('visitor/' + this.vData.visitorData.visitorId).update({
      status: "OUT",
      timeOut: CurrentTime,
      timestampOut: timestampnow,
      exitnote: this.exitNote
    });
    this.modalController.dismiss();
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

}

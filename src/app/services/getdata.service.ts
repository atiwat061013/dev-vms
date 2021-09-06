import { Injectable } from '@angular/core';

// Firebase
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";


var db = firebase.database();
var auth = firebase.auth();
var storage = firebase.storage();
var storageRef = storage.ref();

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  constructor() { }

  getCompany() {
    db.ref('company').on('value', (snapshot) => {
      console.log('Sercompany =>>', snapshot)
    });
  }

  getHistory() {
    db.ref('visitor').on('value', (snapshot) => {
      return snapshot.val();
    });

  }
  
  
}

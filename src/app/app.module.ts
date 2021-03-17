import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from '@firebase/app';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




firebase.initializeApp({
  apiKey: "AIzaSyD5OUoS3dDpN5rkDRdUn355NTIKpFijldE",
    authDomain: "seen-visitor-management.firebaseapp.com",
    databaseURL: "https://seen-visitor-management-default-rtdb.firebaseio.com",
    projectId: "seen-visitor-management",
    storageBucket: "seen-visitor-management.appspot.com",
    messagingSenderId: "103517852228",
    appId: "1:103517852228:web:3862342a31eb3dede6a211",
    measurementId: "G-XMJZZP6YYP"
})

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

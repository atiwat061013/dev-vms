import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitormanagePageRoutingModule } from './visitormanage-routing.module';

import { VisitormanagePage } from './visitormanage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitormanagePageRoutingModule
  ],
  declarations: [VisitormanagePage]
})
export class VisitormanagePageModule {}

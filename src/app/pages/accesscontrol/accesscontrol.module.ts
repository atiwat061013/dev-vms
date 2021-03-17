import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesscontrolPageRoutingModule } from './accesscontrol-routing.module';

import { AccesscontrolPage } from './accesscontrol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesscontrolPageRoutingModule
  ],
  declarations: [AccesscontrolPage]
})
export class AccesscontrolPageModule {}

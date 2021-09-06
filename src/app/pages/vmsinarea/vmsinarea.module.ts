import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmsinareaPageRoutingModule } from './vmsinarea-routing.module';

import { VmsinareaPage } from './vmsinarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VmsinareaPageRoutingModule
  ],
  declarations: [VmsinareaPage]
})
export class VmsinareaPageModule {}

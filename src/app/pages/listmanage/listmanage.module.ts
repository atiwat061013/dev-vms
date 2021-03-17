import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListmanagePageRoutingModule } from './listmanage-routing.module';

import { ListmanagePage } from './listmanage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListmanagePageRoutingModule
  ],
  declarations: [ListmanagePage]
})
export class ListmanagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermanagePageRoutingModule } from './usermanage-routing.module';

import { UsermanagePage } from './usermanage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermanagePageRoutingModule
  ],
  declarations: [UsermanagePage]
})
export class UsermanagePageModule {}

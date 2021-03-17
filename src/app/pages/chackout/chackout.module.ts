import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChackoutPageRoutingModule } from './chackout-routing.module';

import { MatInputModule } from '@angular/material/input';



import { ChackoutPage } from './chackout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    ChackoutPageRoutingModule
  ],
  declarations: [ChackoutPage]
})
export class ChackoutPageModule {}

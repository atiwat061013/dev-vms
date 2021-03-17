import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmsoutPageRoutingModule } from './vmsout-routing.module';

import { VmsoutPage } from './vmsout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VmsoutPageRoutingModule
  ],
  declarations: [VmsoutPage]
})
export class VmsoutPageModule {}

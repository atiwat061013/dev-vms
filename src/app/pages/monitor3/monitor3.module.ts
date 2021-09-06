import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Monitor3PageRoutingModule } from './monitor3-routing.module';

import { Monitor3Page } from './monitor3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Monitor3PageRoutingModule
  ],
  declarations: [Monitor3Page]
})
export class Monitor3PageModule {}

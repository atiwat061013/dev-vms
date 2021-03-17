import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Monitor2PageRoutingModule } from './monitor2-routing.module';

import { Monitor2Page } from './monitor2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Monitor2PageRoutingModule
  ],
  declarations: [Monitor2Page]
})
export class Monitor2PageModule {}

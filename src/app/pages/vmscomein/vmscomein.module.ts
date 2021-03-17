import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmscomeinPageRoutingModule } from './vmscomein-routing.module';

import { VmscomeinPage } from './vmscomein.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VmscomeinPageRoutingModule
  ],
  declarations: [VmscomeinPage]
})
export class VmscomeinPageModule {}

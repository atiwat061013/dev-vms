import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmsinareamorePageRoutingModule } from './vmsinareamore-routing.module';

import { VmsinareamorePage } from './vmsinareamore.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    VmsinareamorePageRoutingModule
  ],
  declarations: [VmsinareamorePage]
})
export class VmsinareamorePageModule {}

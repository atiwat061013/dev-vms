import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VmshistoryPageRoutingModule } from './vmshistory-routing.module';

import { VmshistoryPage } from './vmshistory.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    VmshistoryPageRoutingModule
  ],
  declarations: [VmshistoryPage]
})
export class VmshistoryPageModule {}

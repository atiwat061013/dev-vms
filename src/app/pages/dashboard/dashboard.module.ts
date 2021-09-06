import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatSelectModule} from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgxDatatableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}

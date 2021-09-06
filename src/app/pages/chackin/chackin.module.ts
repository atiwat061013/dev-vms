import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChackinPageRoutingModule } from './chackin-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';


import { ChackinPage } from './chackin.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { OverlayModule } from "@angular/cdk/overlay";




@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChackinPageRoutingModule,
    BrowserAnimationsModule,
    IonicSelectableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    OverlayModule
    
  ],
  declarations: [ChackinPage]
})
export class ChackinPageModule {}

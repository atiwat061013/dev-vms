import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowimgfacePageRoutingModule } from './showimgface-routing.module';

import { ShowimgfacePage } from './showimgface.page';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    IonicModule,
    ShowimgfacePageRoutingModule
  ],
  declarations: [ShowimgfacePage]
})
export class ShowimgfacePageModule {}

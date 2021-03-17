import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowimgfacePageRoutingModule } from './showimgface-routing.module';

import { ShowimgfacePage } from './showimgface.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowimgfacePageRoutingModule
  ],
  declarations: [ShowimgfacePage]
})
export class ShowimgfacePageModule {}

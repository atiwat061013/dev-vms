import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowimgfacePage } from './showimgface.page';

const routes: Routes = [
  {
    path: '',
    component: ShowimgfacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowimgfacePageRoutingModule {}

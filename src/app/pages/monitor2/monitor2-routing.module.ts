import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Monitor2Page } from './monitor2.page';

const routes: Routes = [
  {
    path: '',
    component: Monitor2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Monitor2PageRoutingModule {}

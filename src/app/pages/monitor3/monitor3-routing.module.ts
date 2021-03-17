import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Monitor3Page } from './monitor3.page';

const routes: Routes = [
  {
    path: '',
    component: Monitor3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Monitor3PageRoutingModule {}

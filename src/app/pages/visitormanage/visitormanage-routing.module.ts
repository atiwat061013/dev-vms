import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitormanagePage } from './visitormanage.page';

const routes: Routes = [
  {
    path: '',
    component: VisitormanagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitormanagePageRoutingModule {}

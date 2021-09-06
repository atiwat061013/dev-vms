import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesscontrolPage } from './accesscontrol.page';

const routes: Routes = [
  {
    path: '',
    component: AccesscontrolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesscontrolPageRoutingModule {}

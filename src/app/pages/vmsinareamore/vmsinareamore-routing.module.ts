import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmsinareamorePage } from './vmsinareamore.page';

const routes: Routes = [
  {
    path: '',
    component: VmsinareamorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmsinareamorePageRoutingModule {}

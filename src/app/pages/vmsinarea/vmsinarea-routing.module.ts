import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmsinareaPage } from './vmsinarea.page';

const routes: Routes = [
  {
    path: '',
    component: VmsinareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmsinareaPageRoutingModule {}

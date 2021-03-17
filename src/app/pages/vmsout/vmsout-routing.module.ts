import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmsoutPage } from './vmsout.page';

const routes: Routes = [
  {
    path: '',
    component: VmsoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmsoutPageRoutingModule {}

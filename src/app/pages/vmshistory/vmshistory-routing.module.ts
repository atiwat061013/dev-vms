import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmshistoryPage } from './vmshistory.page';

const routes: Routes = [
  {
    path: '',
    component: VmshistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmshistoryPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VmscomeinPage } from './vmscomein.page';

const routes: Routes = [
  {
    path: '',
    component: VmscomeinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VmscomeinPageRoutingModule {}

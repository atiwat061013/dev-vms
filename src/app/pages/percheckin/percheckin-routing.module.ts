import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PercheckinPage } from './percheckin.page';

const routes: Routes = [
  {
    path: '',
    component: PercheckinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PercheckinPageRoutingModule {}

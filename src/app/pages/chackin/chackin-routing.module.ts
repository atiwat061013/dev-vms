import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChackinPage } from './chackin.page';

const routes: Routes = [
  {
    path: '',
    component: ChackinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChackinPageRoutingModule {}

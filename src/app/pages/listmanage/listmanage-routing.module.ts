import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListmanagePage } from './listmanage.page';

const routes: Routes = [
  {
    path: '',
    component: ListmanagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListmanagePageRoutingModule {}

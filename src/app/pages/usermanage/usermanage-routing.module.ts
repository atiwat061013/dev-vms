import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermanagePage } from './usermanage.page';

const routes: Routes = [
  {
    path: '',
    component: UsermanagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermanagePageRoutingModule {}

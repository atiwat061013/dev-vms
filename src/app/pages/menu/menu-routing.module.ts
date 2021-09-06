import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
        path: '',
        redirectTo: '/menu/dashboard',
        pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
        // {
        //   path: 'usermanage',
        //   loadChildren: () => import('../usermanage/usermanage.module').then(m => m.UsermanagePageModule)
        // },
        {
          path: 'dashboard',
          loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
        },
        {
          path: 'chackin',
          loadChildren: () => import('../chackin/chackin.module').then(m => m.ChackinPageModule)
        },
        {
          path: 'visitormanage',
          loadChildren: () => import('../visitormanage/visitormanage.module').then(m => m.VisitormanagePageModule)
        },
        {
          path: 'vmscomein',
          loadChildren: () => import('../vmscomein/vmscomein.module').then( m => m.VmscomeinPageModule)
        },
        {
          path: 'vmsout',
          loadChildren: () => import('../vmsout/vmsout.module').then( m => m.VmsoutPageModule)
        },
        {
          path: 'vmsinarea',
          loadChildren: () => import('../vmsinarea/vmsinarea.module').then( m => m.VmsinareaPageModule)
        },
        {
          path: 'vmsinareamore',
          loadChildren: () => import('../vmsinareamore/vmsinareamore.module').then( m => m.VmsinareamorePageModule)
        },
        {
          path: 'vmshistory',
          loadChildren: () => import('../vmshistory/vmshistory.module').then( m => m.VmshistoryPageModule)
        },
        {
          path: 'chackout',
          loadChildren: () => import('../chackout/chackout.module').then(m => m.ChackoutPageModule)
        },
        {
          path: 'accesscontrol',
          loadChildren: () => import('../accesscontrol/accesscontrol.module').then( m => m.AccesscontrolPageModule)
        },
        {
          path: 'listmanage',
          loadChildren: () => import('../listmanage/listmanage.module').then( m => m.ListmanagePageModule)
        },
        {
          path: 'monitor1',
          loadChildren: () => import('../monitor1/monitor1.module').then( m => m.Monitor1PageModule)
        },
        {
          path: 'monitor2',
          loadChildren: () => import('../monitor2/monitor2.module').then( m => m.Monitor2PageModule)
        },
        {
          path: 'monitor3',
          loadChildren: () => import('../monitor3/monitor3.module').then( m => m.Monitor3PageModule)
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'showimgface',
    loadChildren: () => import('./pages/showimgface/showimgface.module').then( m => m.ShowimgfacePageModule)
  },
  {
    path: 'percheckin',
    loadChildren: () => import('./pages/percheckin/percheckin.module').then( m => m.PercheckinPageModule)
  },
  // {
  //   path: 'vmscomein',
  //   loadChildren: () => import('./pages/vmscomein/vmscomein.module').then( m => m.VmscomeinPageModule)
  // },
  // {
  //   path: 'vmsout',
  //   loadChildren: () => import('./pages/vmsout/vmsout.module').then( m => m.VmsoutPageModule)
  // },
  // {
  //   path: 'vmsinarea',
  //   loadChildren: () => import('./pages/vmsinarea/vmsinarea.module').then( m => m.VmsinareaPageModule)
  // },
  // {
  //   path: 'vmsinareamore',
  //   loadChildren: () => import('./pages/vmsinareamore/vmsinareamore.module').then( m => m.VmsinareamorePageModule)
  // },
  // {
  //   path: 'vmshistory',
  //   loadChildren: () => import('./pages/vmshistory/vmshistory.module').then( m => m.VmshistoryPageModule)
  // },
  // {
  //   path: 'chackout',
  //   loadChildren: () => import('./pages/chackout/chackout.module').then( m => m.ChackoutPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'chackin',
  //   loadChildren: () => import('./pages/chackin/chackin.module').then( m => m.ChackinPageModule)
  // },
  // {
  //   path: 'visitormanage',
  //   loadChildren: () => import('./pages/visitormanage/visitormanage.module').then( m => m.VisitormanagePageModule)
  // },
  // {
  //   path: 'monitor3',
  //   loadChildren: () => import('./pages/monitor3/monitor3.module').then( m => m.Monitor3PageModule)
  // },
  // {
  //   path: 'usermanage',
  //   loadChildren: () => import('./pages/usermanage/usermanage.module').then( m => m.UsermanagePageModule)
  // },
  // {
  //   path: 'accesscontrol',
  //   loadChildren: () => import('./pages/accesscontrol/accesscontrol.module').then( m => m.AccesscontrolPageModule)
  // },
  // {
  //   path: 'listmanage',
  //   loadChildren: () => import('./pages/listmanage/listmanage.module').then( m => m.ListmanagePageModule)
  // },
  // {
  //   path: 'monitor1',
  //   loadChildren: () => import('./pages/monitor1/monitor1.module').then( m => m.Monitor1PageModule)
  // },
  // {
  //   path: 'monitor2',
  //   loadChildren: () => import('./pages/monitor2/monitor2.module').then( m => m.Monitor2PageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

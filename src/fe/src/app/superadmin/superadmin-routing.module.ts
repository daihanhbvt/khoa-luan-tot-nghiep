import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminComponent } from './superadmin/superadmin.component';

const routes: Routes = [
  {
    path: '', pathMatch: '**', component: SuperadminComponent, children: [
      { path: '', redirectTo: 'hotels', pathMatch: '**' },
      {
        path: 'hotels',
        loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'template-management',
        loadChildren: () => import('./template-management/template-management.module').then(m => m.TemplateManagementModule)
      },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }

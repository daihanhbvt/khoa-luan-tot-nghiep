import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LangdingComponent } from './langding.component';

const routes: Routes = [
  { path: '', component: LangdingComponent,  pathMatch:'**'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }

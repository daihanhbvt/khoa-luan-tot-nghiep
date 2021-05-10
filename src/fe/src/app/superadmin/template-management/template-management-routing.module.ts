import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListTemplateDefaultItemComponent } from './check-list-template-default-item/check-list-template-default-item.component';
import { CheckListTemplateDefaultComponent } from './check-list-template-default/check-list-template-default.component';
import { CheckStatusTemplateComponent } from './check-status-template/check-status-template.component';
import { CleanStatusTemplateComponent } from './clean-status-template/clean-status-template.component';
import { RoomStatusTemplateComponent } from './room-status-template/room-status-template.component';
import { RoomTypeTemplateComponent } from './room-type-template/room-type-template.component';
import { TablePropertiesComponent } from './table-properties/table-properties.component';
import { TemplateManagementComponent } from './template-management.component';

const routes: Routes = [

  {
    path: '', pathMatch: '**', component: TemplateManagementComponent, children: [
      { path: '', redirectTo: 'check-list-template', pathMatch: '**' },
      { path: 'check-list-template', component: CheckListTemplateDefaultComponent, },
      { path: 'check-list-template-default-item/:id', component: CheckListTemplateDefaultItemComponent, },
      { path: 'check-status-template', component: CheckStatusTemplateComponent, },
      { path: 'clean-status-template', component: CleanStatusTemplateComponent, },
      { path: 'room-status-template', component: RoomStatusTemplateComponent, },
      { path: 'room-type-template', component: RoomTypeTemplateComponent, },
      //{ path: 'check-list-template-default-item', component: CheckListTemplateDefaultItemComponent, },
      { path: 'table-properties', component: TablePropertiesComponent, },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateManagementRoutingModule { }

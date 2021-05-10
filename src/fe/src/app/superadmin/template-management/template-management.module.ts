import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListTemplateDefaultComponent } from './check-list-template-default/check-list-template-default.component';
import { CheckStatusTemplateComponent } from './check-status-template/check-status-template.component';
import { CleanStatusTemplateComponent } from './clean-status-template/clean-status-template.component';
import { RoomStatusTemplateComponent } from './room-status-template/room-status-template.component';
import { RoomTypeTemplateComponent } from './room-type-template/room-type-template.component';
import { CheckListTemplateDefaultItemComponent } from './check-list-template-default-item/check-list-template-default-item.component';
import { TablePropertiesComponent } from './table-properties/table-properties.component';
import { TemplateManagementRoutingModule } from './template-management-routing.module';
import { CheckListTemplateDefaultService } from './check-list-template-default/service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material-module';
import { CreateCheckListTemplateDefaultComponent } from './check-list-template-default/create/create.component';
import { DeleteCheckListTemplateDefaultComponent } from './check-list-template-default/delete/delete.component';
import { CreateCheckListTemplateDefaultItemComponent } from './check-list-template-default-item/create/create.component';
import { DeleteCheckListTemplateDefaultItemComponent } from './check-list-template-default-item/delete/delete.component';
import { CheckListTemplateDefaultItemService } from './check-list-template-default-item/service';
import { RouterModule } from '@angular/router';
import { CreateCleanStatusTemplateComponent } from './clean-status-template/create/create.component';
import { DeleteCleanStatusTemplateComponent } from './clean-status-template/delete/delete.component';
import { CleanStatusTemplateService } from './clean-status-template/clean-status-template.service';
import { CreateCheckStatusTemplateComponent } from './check-status-template/create/create.component';
import { DeleteCheckStatusTemplateComponent } from './check-status-template/delete/delete.component';
import { CheckStatusTemplateService } from './check-status-template/check-status-template.service';
import { CreateRoomStatusTemplateComponent } from './room-status-template/create/create.component';
import { RoomStatusTemplateService } from './room-status-template/room-status-template.service';
import { DeleteRoomStatusTemplateComponent } from './room-status-template/delete/delete.component';
import { DeleteRoomTypeTemplateComponent } from './room-type-template/delete/delete.component';
import { CreateRoomTypeTemplateComponent } from './room-type-template/create/create.component';
import { RoomTypeTemplateService } from './room-type-template/room-type-template.service';
import { CreateTablePropertiesComponent } from './table-properties/create/create.component';
import { DeleteTablePropertiesComponent } from './table-properties/delete/delete.component';
import { TablePropertiesService } from './table-properties/table-properties.service';

@NgModule({
  declarations: [
    CheckListTemplateDefaultComponent,
    CreateCheckListTemplateDefaultComponent,
    DeleteCheckListTemplateDefaultComponent,

    CheckListTemplateDefaultItemComponent,
    CreateCheckListTemplateDefaultItemComponent,
    DeleteCheckListTemplateDefaultItemComponent,

    CheckStatusTemplateComponent,
    CreateCheckStatusTemplateComponent,
    DeleteCheckStatusTemplateComponent,

    CleanStatusTemplateComponent,
    CreateCleanStatusTemplateComponent,
    DeleteCleanStatusTemplateComponent,

    RoomStatusTemplateComponent,
    CreateRoomStatusTemplateComponent,
    DeleteRoomStatusTemplateComponent,
    

    RoomTypeTemplateComponent,
    CreateRoomTypeTemplateComponent,
    DeleteRoomTypeTemplateComponent,
  
    TablePropertiesComponent,
    CreateTablePropertiesComponent,
    DeleteTablePropertiesComponent
  ],
  imports: [
    CommonModule,
    TemplateManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    CheckListTemplateDefaultService, 
    CheckListTemplateDefaultItemService, 
    CleanStatusTemplateService,
    CheckStatusTemplateService,
    RoomStatusTemplateService,
    RoomTypeTemplateService,
    TablePropertiesService,
  ],

})
export class TemplateManagementModule { }

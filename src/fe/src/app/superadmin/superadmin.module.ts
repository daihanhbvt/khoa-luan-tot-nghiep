import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HotelService } from './hotel/hotel.service';


@NgModule({
  declarations: [TemplateManagementComponent, SuperadminComponent
  ],

  imports: [
    CommonModule,
    SuperadminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    
  ]
})
export class SuperadminModule { }

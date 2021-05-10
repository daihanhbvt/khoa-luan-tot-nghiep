import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { ScheduleJobComponent } from './schedule-job/schedule-job.component';
import { ScheduleJobService } from './schedule-job/schedule-job.service';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentService } from './assignment/assignment.service';
import { PublicJobComponent } from './public-job/public-job.component';
import { PublicJobService } from './public-job/public-job.service';
import { CreateBookComponent } from './booked/create/create.component';
import { BookedComponent } from './booked/booked.component';
import { BookedService } from './booked/booked.service';
import { DeleteBookComponent } from './booked/delete/delete.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { CheckListComponent } from './clean-detail/check-list/check-list.component';
import { CheckListService } from './clean-detail/check-list/check-list.service';
import { CleanDetailComponent } from './clean-detail/clean-detail.component';
import { CommentsComponent } from './clean-detail/comments/comments.component';
import { CleanDetailService } from './clean-detail/clean-detail.service';
import { ManagerService } from './manager/manager.service';
import { CheckDetailService } from './check-detail/check-detail.service';
import { AssignDetailService } from './assign-detail/assign-detail.service';
import { CommentsCdComponent } from './check-detail/comments/comments.component';
import { CommentsAdComponent } from './assign-detail/comments/comments.component';
import { CheckListCdComponent } from './check-detail/check-list/check-list.component';
import { CheckListAdComponent } from './assign-detail/check-list/check-list.component';
import { CheckDetailComponent } from './check-detail/check-detail.component';
import { AssignDetailComponent } from './assign-detail/assign-detail.component';


@NgModule({
  declarations: [ManagerComponent, ScheduleJobComponent, 
    PublicJobComponent,
    
    AssignmentComponent, 
    CreateBookComponent,

    EmployeeComponent,
    CheckListComponent,

    CreateBookComponent,
    DeleteBookComponent,
    BookedComponent,
    CleanDetailComponent,
    CheckDetailComponent,
    AssignDetailComponent,

    CommentsComponent,

    CommentsCdComponent,
    CommentsAdComponent,
    CheckListCdComponent,
    CheckListAdComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ScheduleJobService,
    PublicJobService,
    AssignmentService,
    EmployeeService,
    BookedService,
    CheckListService,
    CleanDetailService,
    CheckDetailService,
    AssignDetailService,
    ManagerService
  ]
})
export class ManagerModule { }

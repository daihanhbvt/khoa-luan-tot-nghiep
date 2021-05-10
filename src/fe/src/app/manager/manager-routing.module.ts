import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignDetailComponent } from './assign-detail/assign-detail.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { BookedComponent } from './booked/booked.component';
import { CheckDetailComponent } from './check-detail/check-detail.component';
import { CheckListComponent } from './clean-detail/check-list/check-list.component';
import { CleanDetailComponent } from './clean-detail/clean-detail.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { PublicJobComponent } from './public-job/public-job.component';
import { ScheduleJobComponent } from './schedule-job/schedule-job.component';

const routes: Routes = [{
  path: '', pathMatch: '**', component: ManagerComponent, children: [
    { path: '', redirectTo: 'schedule-job', pathMatch: '**' },
    { path: 'schedule-job', component: ScheduleJobComponent, },
    { path: 'public-job', component: PublicJobComponent, },
    { path: 'assignment', component: AssignmentComponent, },
    { path: 'employee', component: EmployeeComponent, },
    { path: 'booked', component: BookedComponent, },
    { path: 'clean-detail/:aid', component: CleanDetailComponent, },
    { path: 'check-detail/:aid', component: CheckDetailComponent, },
    { path: 'assignment-detail/:aid', component: AssignDetailComponent, },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

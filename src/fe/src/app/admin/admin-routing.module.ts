import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckListTemplateComponent } from './check-list-template/check-list-template.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { CleanStatusComponent } from './clean-status/clean-status.component';
import { FloorsComponent } from './floors/floors.component';
import { HotelComponent } from './hotel/hotel.component';
import { RoomStatusComponent } from './room-status/room-status.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RoomComponent } from './room/room.component';
import { CleanComponent } from './clean/clean.component';
import { CustomerComponent } from './customer/customer.component';
import { PublicAreaComponent } from './public-area/public-area.component';
import { UserComponent } from './user/user.component';
import { CheckListTemplateItemComponent } from './check-list-template-item/check-list-template-item.component';


const routes: Routes = [
  {
    path: '', pathMatch: '**', component: AdminComponent, children: [
      { path: '', redirectTo: 'check-list-template', pathMatch: '**' },
      { path: 'check-list-template', component: CheckListTemplateComponent, },     
      { path: 'check-status', component: CheckStatusComponent, },     
      { path: 'clean-status', component: CleanStatusComponent, },     
      { path: 'room-status', component: RoomStatusComponent, },     
      { path: 'room-type', component: RoomTypeComponent, },     
      { path: 'room/:hid/:fid', component: RoomComponent, },     
      { path: 'floors/:id', component: FloorsComponent, },     
      { path: 'hotel', component: HotelComponent, },     
      { path: 'public-area/:hid/:fid', component: PublicAreaComponent, },     
      { path: 'clean', component: CleanComponent, },     
      { path: 'customer', component: CustomerComponent, }, 
      { path: 'check-list-template-item', component: CheckListTemplateItemComponent, },     
      { path: 'user', component: UserComponent, } 
      ,]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

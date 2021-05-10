import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from '../hotel/hotel.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { MaterialModule } from '../../material-module';
import { HotelService } from './hotel.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateHotelComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteHotelComponent } from './delete/delete.component';
 

@NgModule({
  declarations: [HotelComponent, CreateHotelComponent, DeleteHotelComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HotelService],
  entryComponents: [
    CreateHotelComponent, DeleteHotelComponent
  ],
})
export class HotelModule { }

import { Mapper } from 'src/common';
import { ResCustomer } from 'src/customer/models/res.customer.model';
import { ResRoomStatus } from 'src/room-status/models/res.room-status.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { Booked } from '../entities/booked.entity';

export class ResBooked {
  id: string;
  name: string;
  description: string;
  from_date: Date;
  to_date: Date;

  room: ResRoom;
  room_status: ResRoomStatus;
  customer: ResCustomer;
  constructor(json?: Booked) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.from_date = json?.FromDate;
    this.to_date = json?.ToDate;
    this.room = json?.Room ? Mapper.map(ResRoom, json.Room) : null;
    this.customer = json?.Customer? Mapper.map(ResCustomer, json.Customer): null;
    this.room_status = json?.RoomStatus? Mapper.map(ResRoomStatus, json.RoomStatus): null;
  }
}

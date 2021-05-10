import { ResAssignment } from 'src/assignment/models/res.assigment.model';
import { ResBooked } from 'src/booked/models/res.booked.model';
import { ResCheckStatus } from 'src/check-status/models/res.check-status.model';
import { ResCleanStatus } from 'src/clean-status/models/res.clean-status.model';
import { Mapper } from 'src/common';
import { ResCustomer } from 'src/customer/models/res.customer.model';
import { ResFloors } from 'src/floors/models/res.floors.model';
import { ResRoomStatus } from 'src/room-status/models/res.room-status.model';
import { ResRoomType } from 'src/room-type/models/res.room-type.model';
import { Room } from '../entities/room.entity';

export class ResRoom {
  id: string;
  name: string;
  description: string;

  floors: ResFloors;
  room_type: ResRoomType;
  customer: ResCustomer;
  room_status: ResRoomStatus;
  clean_status: ResCleanStatus;
  check_status: ResCheckStatus;
  bookeds: ResBooked[];
  assignments: ResAssignment[];

  constructor(json?: Room) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.floors = json?.Floors ? Mapper.map(ResFloors, json.Floors) : null;
    this.room_type = json?.RoomType
      ? Mapper.map(ResRoomType, json.RoomType)
      : null;
    // this.customer = json?.Bookeds && json?.Bookeds.Customer ? Mapper.map(ResCustomer, json?.Bookeds.Customer) : null;
    this.room_status = json?.RoomStatus
      ? Mapper.map(ResRoomStatus, json?.RoomStatus)
      : null;
    this.clean_status = json?.CleanStatus
      ? Mapper.map(ResCleanStatus, json?.CleanStatus)
      : null;
    this.check_status = json?.CheckStatus
      ? Mapper.map(ResCheckStatus, json?.CheckStatus)
      : null;
    this.bookeds = json?.Bookeds ? Mapper.map(ResBooked, json?.Bookeds) : null;
    this.assignments = json?.Assignments
      ? Mapper.map(ResAssignment, json?.Assignments)
      : null;
  }
}

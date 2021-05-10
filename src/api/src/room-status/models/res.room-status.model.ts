import { Mapper } from 'src/common';
import { ResRoom } from 'src/room/models/res.room.model';
import { RoomStatus } from '../entities/room-status.entity';

export class ResRoomStatus {
  id: string;
  name: string;
  color: string;
  description: string;
  rooms: ResRoom[];

  constructor(json?: RoomStatus) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.description = json?.Description;
    this.rooms = json?.Rooms ? Mapper.map(ResRoom, json.Rooms) : null;
  }
}

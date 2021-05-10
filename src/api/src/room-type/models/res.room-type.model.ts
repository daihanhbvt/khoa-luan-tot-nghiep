import { Mapper } from 'src/common';
import { ResRoom } from 'src/room/models/res.room.model';
import { RoomType } from '../entities/room-type.entity';

export class ResRoomType {
  id: string;
  name: string;
  description: string;
  rooms: ResRoom[];

  constructor(json?: RoomType) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.rooms = json?.Rooms ? Mapper.map(ResRoom, json.Rooms) : null;
  }
}

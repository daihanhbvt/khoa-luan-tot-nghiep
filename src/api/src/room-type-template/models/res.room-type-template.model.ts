import { Mapper } from 'src/common';
import { ResRoom } from 'src/room/models/res.room.model';
import { RoomTypeTemplate } from '../entities/room-type-template.entity';

export class ResRoomTypeTemplate {
  id: string;
  name: string;
  description: string;
  rooms: ResRoom[];

  constructor(json?: RoomTypeTemplate) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
  }
}

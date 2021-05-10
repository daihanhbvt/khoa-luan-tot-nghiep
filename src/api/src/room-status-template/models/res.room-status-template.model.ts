import { Mapper } from 'src/common';
import { ResRoom } from 'src/room/models/res.room.model';
import { RoomStatusTemplate } from '../entities/room-status-template.entity';

export class ResRoomStatusTemplate {
  id: string;
  name: string;
  color: string;
  description: string;
  rooms: ResRoom[];

  constructor(json?: RoomStatusTemplate) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.description = json?.Description;
  }
}

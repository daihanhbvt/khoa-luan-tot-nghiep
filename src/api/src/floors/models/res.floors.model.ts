import { Mapper } from 'src/common';
import { ResHotel } from 'src/hotel/models/res.hotel.model';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { Floors } from '../entities/floors.entity';

export class ResFloors {
  id: string;
  name: string;
  description: string;

  hotel: ResHotel;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];

  constructor(json?: Floors) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.hotel = json?.Hotel ? Mapper.map(ResHotel, json?.Hotel) : null;
    this.rooms = json?.Rooms ? Mapper.map(ResRoom, json.Rooms) : null;
    this.public_areas = json?.PublicAreas
      ? Mapper.map(ResPublicArea, json.PublicAreas)
      : null;
  }
}

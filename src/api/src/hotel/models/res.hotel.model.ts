import { Mapper } from 'src/common';
import { ResFloors } from 'src/floors/models/res.floors.model';
import { Hotel } from '../entities/hotel.entity';

export class ResHotel {
  id: string;
  name: string;
  description: string;
  phone: string;
  address: string;
  email: string;
  owner: string;
  start: string;
  floorses: ResFloors[];

  constructor(json?: Hotel) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.phone = json?.Phone;
    this.address = json?.Address;
    this.email = json?.Email;
    this.owner = json?.Owner;
    this.start = json?.Start;
    this.floorses = json?.Floorses
      ? Mapper.map(ResFloors, json.Floorses)
      : null;
  }
}

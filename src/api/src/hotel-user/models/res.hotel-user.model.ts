import { HotelUser } from '../entities/hotel-user.entity';

export class ResHotelUser {
  id: string;
  name: string;
  description: string;
  data: string;

  constructor(json?: HotelUser) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.data = json?.Data;
  }
}

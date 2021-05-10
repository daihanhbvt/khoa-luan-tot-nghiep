import { ResBooked } from 'src/booked/models/res.booked.model';
import { Mapper } from 'src/common';
import { Customer } from '../entities/customer.entity';

export class ResCustomer {
  id: string;
  name: string;
  description: string;
  login_code: string;
  birthday: Date;
  gender: string;
  phone: string;
  email: string;
  address: string;
  identity_card: string;

  bookeds: ResBooked[];

  constructor(json?: Customer) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.login_code = json?.LoginCode;
    this.birthday = json?.Birthday;
    this.gender = json?.Gender;
    this.address = json?.Address;
    this.phone = json?.Phone;
    this.email = json?.Email;
    this.identity_card = json?.IdentityCard;
    this.bookeds = json?.Bookeds ? Mapper.map(ResBooked, json.Bookeds) : null;
  }
}

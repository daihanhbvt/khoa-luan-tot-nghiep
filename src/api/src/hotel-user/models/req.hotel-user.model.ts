import { ApiProperty } from '@nestjs/swagger';
import { HotelUser } from '../entities/hotel-user.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqHotelUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  data: string;

  constructor(json?: HotelUser) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.data = json?.Data || '';
  }
  public static runValidator(hotelUser: ReqHotelUser) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(hotelUser.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Floors } from '../entities/floors.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqFloors {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  hotel_id: string;

  constructor(json?: Floors) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.hotel_id = json?.HotelId || '';
  }
  public static runValidator(floors: ReqFloors) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(floors.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!floors.hotel_id) {
      messages.push({
        field: 'hotel_id',
        message: Consts.MSG_FIELD_REQUIRED('hotel_id'),
      });
    }

    return messages;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Hotel } from '../entities/hotel.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqHotel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  start: string;

  constructor(json?: Hotel) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.phone = json?.Phone || '';
    this.address = json?.Address || '';
    this.email = json?.Email || '';
    this.owner = json?.Owner || '';
    this.companyId = json?.CompanyId || '';
    this.start = json?.Start || '';
  }
  public static runValidator(hotel: ReqHotel) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(hotel.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

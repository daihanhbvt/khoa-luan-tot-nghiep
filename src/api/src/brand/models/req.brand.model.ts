import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '../entities/brand.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqBrand {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(json?: Brand) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
  }
  public static runValidator(brand: ReqBrand) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(brand.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

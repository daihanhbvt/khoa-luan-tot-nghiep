import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqCategory {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(json?: Category) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
  }
  public static runValidator(category: ReqCategory) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(category.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

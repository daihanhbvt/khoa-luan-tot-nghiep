import { ApiProperty } from '@nestjs/swagger';
import { Init } from '../entities/init.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqInit {
  @ApiProperty()
  company_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  constructor(json?: any) {
    this.name = json?.Name || '';
  }
  public static runValidator(init: ReqInit) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(init.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

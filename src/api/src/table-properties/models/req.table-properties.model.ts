import { ApiProperty } from '@nestjs/swagger';
import { TableProperties } from '../entities/table-properties.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqTableProperties {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  data: string;

  constructor(json?: TableProperties) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.data = json?.Data || '';
  }
  public static runValidator(tableProperties: ReqTableProperties) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(tableProperties.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

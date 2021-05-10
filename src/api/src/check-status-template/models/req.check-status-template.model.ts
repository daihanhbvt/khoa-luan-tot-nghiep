import { ApiProperty } from '@nestjs/swagger';
import { CheckStatusTemplate } from '../entities/check-status-template.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckStatusTemplate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: CheckStatusTemplate) {
    this.name = json?.Name || '';
    this.color = json?.Color || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
  }
  public static runValidator(checkStatusTemplate: ReqCheckStatusTemplate) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkStatusTemplate.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

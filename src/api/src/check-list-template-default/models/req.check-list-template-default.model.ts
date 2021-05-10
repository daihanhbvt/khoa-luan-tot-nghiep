import { ApiProperty } from '@nestjs/swagger';
import { CheckListTemplateDefault } from '../entities/check-list-template-default.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListTemplateDefault {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: CheckListTemplateDefault) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
  }
  public static runValidator(
    checkListTemplateDefault: ReqCheckListTemplateDefault,
  ) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListTemplateDefault.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

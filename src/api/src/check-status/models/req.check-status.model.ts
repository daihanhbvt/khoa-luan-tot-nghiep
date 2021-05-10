import { ApiProperty } from '@nestjs/swagger';
import { CheckStatus } from '../entities/check-status.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckStatus {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  display_index: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: CheckStatus) {
    this.name = json?.Name || '';
    this.color = json?.Color || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
    this.display_index = json?.DisplayIndex || '';
  }
  public static runValidator(checkStatus: ReqCheckStatus) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkStatus.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

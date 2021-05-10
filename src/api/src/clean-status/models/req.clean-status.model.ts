import { ApiProperty } from '@nestjs/swagger';
import { CleanStatus } from '../entities/clean-status.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCleanStatus {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  @ApiProperty()
  display_index: string;

  constructor(json?: CleanStatus) {
    this.name = json?.Name || '';
    this.color = json?.Color || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
    this.display_index = json?.DisplayIndex || '';
  }
  public static runValidator(cleanStatus: ReqCleanStatus) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(cleanStatus.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

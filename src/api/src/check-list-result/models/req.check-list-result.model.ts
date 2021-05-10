import { ApiProperty } from '@nestjs/swagger';
import { CheckListResult } from '../entities/check-list-result.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListResult {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  @ApiProperty()
  check_list_id: string;
  @ApiProperty()
  check_list_item_id: string;

  constructor(json?: CheckListResult) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.check_list_id = json?.CheckListId || '';
    this.check_list_item_id = json?.CheckListItemId || '';
  }
  public static runValidator(checkListResult: ReqCheckListResult) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListResult.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!checkListResult.check_list_id) {
      messages.push({
        field: 'check_list_id',
        message: Consts.MSG_FIELD_REQUIRED('check_list_id'),
      });
    }

    if (!checkListResult.check_list_item_id) {
      messages.push({
        field: 'check_list_item_id',
        message: Consts.MSG_FIELD_REQUIRED('check_list_item_id'),
      });
    }
    return messages;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { CheckListItem } from '../entities/check-list-item.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListItem {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  check_list_id: string;

  constructor(json?: CheckListItem) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.check_list_id = json?.CheckListId || '';
  }
  public static runValidator(checkListItem: ReqCheckListItem) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListItem.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!checkListItem.check_list_id) {
      messages.push({
        field: 'check_list_id',
        message: Consts.MSG_FIELD_REQUIRED('check_list_id'),
      });
    }
    return messages;
  }
}

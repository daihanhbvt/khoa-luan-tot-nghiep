import { ApiProperty } from '@nestjs/swagger';
import { CheckList } from '../entities/check-list.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckList {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  check_list_template_id: string;

  @ApiProperty()
  clean_id: string;

  @ApiProperty()
  display_index: string;

  constructor(json?: CheckList) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.check_list_template_id = json?.CheckListTemplateId || '';
    this.clean_id = json?.CleanId || '';
    this.display_index = json?.DisplayIndex || '';
  }
  public static runValidator(checkList: ReqCheckList) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkList.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!checkList.check_list_template_id) {
      messages.push({
        field: 'check_list_template_id',
        message: Consts.MSG_FIELD_REQUIRED('check_list_template_id'),
      });
    }

    if (!checkList.clean_id) {
      messages.push({
        field: 'clean_id',
        message: Consts.MSG_FIELD_REQUIRED('clean_id'),
      });
    }
    return messages;
  }
}

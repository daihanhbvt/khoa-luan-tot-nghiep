import { ApiProperty } from '@nestjs/swagger';
import { CheckListTemplateItem } from '../entities/check-list-template-item.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListTemplateItem {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  check_list_template_id: string;

  constructor(json?: CheckListTemplateItem) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.check_list_template_id = json?.CheckListTemplateId || '';
  }
  public static runValidator(checkListTemplateItem: ReqCheckListTemplateItem) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListTemplateItem.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!checkListTemplateItem.check_list_template_id) {
      messages.push({
        field: 'check_list_template_id',
        message: Consts.MSG_FIELD_REQUIRED('check_list_template_id'),
      });
    }
    return messages;
  }
}

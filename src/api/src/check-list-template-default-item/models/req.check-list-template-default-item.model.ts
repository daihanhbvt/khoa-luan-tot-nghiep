import { ApiProperty } from '@nestjs/swagger';
import { CheckListTemplateDefaultItem } from '../entities/check-list-template-default-item.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListTemplateDefaultItem {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  check_list_template_default_id: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: CheckListTemplateDefaultItem) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
    this.check_list_template_default_id =
      json?.CheckListTemplateDefaultId || '';
  }
  public static runValidator(
    checkListTemplateDefaultItem: ReqCheckListTemplateDefaultItem,
  ) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListTemplateDefaultItem.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    // if (!checkListTemplateDefaultItem.check_list_template_default_id) {
    //     messages.push({ field: "check_list_template_default_id", message: Consts.MSG_FIELD_REQUIRED("check_list_template_default_id") });
    // }
    return messages;
  }
}

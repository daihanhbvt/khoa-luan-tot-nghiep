import { ResCheckListTemplateDefaultItem } from 'src/check-list-template-default-item/models/res.check-list-template-default-item.model';
import { Mapper } from 'src/common';
import { CheckListTemplateDefault } from '../entities/check-list-template-default.entity';

export class ResCheckListTemplateDefault {
  id: string;
  name: string;
  description: string;
  check_list_template_default_items: ResCheckListTemplateDefaultItem[];

  constructor(json?: CheckListTemplateDefault) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.check_list_template_default_items = json?.CheckListTemplateDefaultItems
      ? Mapper.map(
          ResCheckListTemplateDefaultItem,
          json.CheckListTemplateDefaultItems,
        )
      : null;
  }
}

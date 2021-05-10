import { ResCheckListTemplateDefault } from 'src/check-list-template-default/models/res.check-list-template-default.model';
import { Mapper } from 'src/common';
import { CheckListTemplateDefaultItem } from '../entities/check-list-template-default-item.entity';

export class ResCheckListTemplateDefaultItem {
  id: string;
  name: string;
  description: string;
  check_list_template_default: ResCheckListTemplateDefault;

  constructor(json?: CheckListTemplateDefaultItem) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.check_list_template_default = json?.CheckListTemplateDefault
      ? Mapper.map(ResCheckListTemplateDefault, json.CheckListTemplateDefault)
      : null;
  }
}

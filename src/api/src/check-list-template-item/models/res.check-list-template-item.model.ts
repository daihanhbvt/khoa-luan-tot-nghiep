import { ResCheckListTemplate } from 'src/check-list-template/models/res.check-list-template.model';
import { Mapper } from 'src/common';
import { CheckListTemplateItem } from '../entities/check-list-template-item.entity';

export class ResCheckListTemplateItem {
  id: string;
  name: string;
  description: string;
  check_list_template: ResCheckListTemplate;

  constructor(json?: CheckListTemplateItem) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.check_list_template = json?.CheckListTemplate
      ? Mapper.map(ResCheckListTemplate, json.CheckListTemplate)
      : null;
  }
}

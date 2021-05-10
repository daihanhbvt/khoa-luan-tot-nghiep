import { ResCheckListItem } from 'src/check-list-item/models/res.check-list-item.model';
import { ResCheckListResult } from 'src/check-list-result/models/res.check-list-result.model';
import { ResCheckListTemplate } from 'src/check-list-template/models/res.check-list-template.model';
import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { CheckList } from '../entities/check-list.entity';

export class ResCheckList {
  id: string;
  name: string;
  description: string;
  display_index: string;
  check_list_template: ResCheckListTemplate;
  check_list_items: ResCheckListItem[];
  check_list_results: ResCheckListResult[];
  clean: ResClean;

  constructor(json?: CheckList) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.display_index = json?.DisplayIndex;
    this.check_list_template = json?.CheckListTemplate
      ? Mapper.map(ResCheckListTemplate, json.CheckListTemplate)
      : null;
    this.check_list_items = json?.CheckListItems
      ? Mapper.map(ResCheckListItem, json.CheckListItems)
      : null;
    this.check_list_results = json?.CheckListResults
      ? Mapper.map(ResCheckListResult, json.CheckListResults)
      : null;
    this.clean = json?.Clean ? Mapper.map(ResClean, json.Clean) : null;
  }
}

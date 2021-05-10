import { ResCheckListItem } from 'src/check-list-item/models/res.check-list-item.model';
import { ResCheckList } from 'src/check-list/models/res.check-list.model';
import { Mapper } from 'src/common';
import { CheckListResult } from '../entities/check-list-result.entity';

export class ResCheckListResult {
  id: string;
  name: string;
  description: string;
  check_list: ResCheckList;
  check_list_item: ResCheckListItem;

  constructor(json?: CheckListResult) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.check_list = json?.CheckList
      ? Mapper.map(ResCheckList, json.CheckList)
      : null;
    this.check_list_item = json?.CheckListItem
      ? Mapper.map(ResCheckListItem, json.CheckListItem)
      : null;
  }
}

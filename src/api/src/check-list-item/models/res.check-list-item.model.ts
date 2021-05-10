import { ResCheckListResult } from 'src/check-list-result/models/res.check-list-result.model';
import { ResCheckList } from 'src/check-list/models/res.check-list.model';
import { Mapper } from 'src/common';
import { CheckListItem } from '../entities/check-list-item.entity';

export class ResCheckListItem {
  id: string;
  name: string;
  description: string;
  check_list: ResCheckList;
  check_list_results: ResCheckListResult[];

  constructor(json?: CheckListItem) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.check_list = json?.CheckList
      ? Mapper.map(ResCheckList, json.CheckList)
      : null;
    this.check_list_results = json?.CheckListResults
      ? Mapper.map(ResCheckListResult, json.CheckListResults)
      : null;
  }
}

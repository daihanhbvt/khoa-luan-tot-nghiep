import { ResAssignment } from 'src/assignment/models/res.assigment.model';
import { ResCheckList } from 'src/check-list/models/res.check-list.model';
import { ResCheckStatus } from 'src/check-status/models/res.check-status.model';
import { ResCleanStatus } from 'src/clean-status/models/res.clean-status.model';
import { ResComment } from 'src/comment/models/res.comment.model';
import { Mapper } from 'src/common';
import { Clean } from '../entities/clean.entity';

export class ResClean {
  id: string;
  name: string;
  description: string;
  assignment: ResAssignment;
  clean_status: ResCleanStatus;
  check_status: ResCheckStatus;
  check_lists: ResCheckList[];
  comments: ResComment[];

  constructor(json?: Clean) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.assignment = json?.Assignment ? Mapper.map(ResAssignment, json.Assignment) : null;
    this.clean_status = json?.CleanStatus ? Mapper.map(ResCleanStatus, json.CleanStatus) : null;
    this.check_status = json?.CheckStatus ? Mapper.map(ResCheckStatus, json.CheckStatus) : null;
    this.check_lists = json?.CheckLists? Mapper.map(ResCheckList, json.CheckLists): null;
    this.comments = json?.Comments? Mapper.map(ResComment, json.Comments): null;
  }
}

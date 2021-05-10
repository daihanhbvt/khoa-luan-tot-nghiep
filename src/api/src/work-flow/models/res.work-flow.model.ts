import { ResUser } from 'src/base-model/res.user.model';
import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { WorkFlow } from '../entities/work-flow.entity';

export class ResWorkFlow {
  id: string;

  constructor(json?: WorkFlow | any) {
    this.id = json?.Id;
  }
}

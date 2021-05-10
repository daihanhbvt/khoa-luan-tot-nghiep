import { ResUser } from 'src/base-model/res.user.model';
import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { Comment } from '../entities/comment.entity';

export class ResComment {
  id: string;
  content: string;
  clean: ResClean;
  user_id: string;

  constructor(json?: Comment | any) {
    this.id = json?.Id;
    this.content = json?.Content;

    this.user_id = json?.UserId;
    this.clean = json?.Cleans ? Mapper.map(ResClean, json.Cleans) : null;
  }
}

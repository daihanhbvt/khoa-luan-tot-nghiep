import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { Init } from '../entities/init.entity';

export class ResInit {
  id: string;
  name: string;
  description: string;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];
  cleans: ResClean[];

  constructor(json?: Init) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
  }
}

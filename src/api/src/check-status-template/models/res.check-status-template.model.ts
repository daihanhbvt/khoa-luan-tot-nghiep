import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { CheckStatusTemplate } from '../entities/check-status-template.entity';

export class ResCheckStatusTemplate {
  id: string;
  name: string;
  color: string;
  description: string;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];
  cleans: ResClean[];

  constructor(json?: CheckStatusTemplate) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.description = json?.Description;
  }
}

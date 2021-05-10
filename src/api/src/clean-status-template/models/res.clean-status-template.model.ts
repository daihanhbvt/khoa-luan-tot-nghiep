import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { CleanStatusTemplate } from '../entities/clean-status-template.entity';

export class ResCleanStatusTemplate {
  id: string;
  name: string;
  color: string;
  description: string;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];
  cleans: ResClean[];

  constructor(json?: CleanStatusTemplate) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.description = json?.Description;
  }
}

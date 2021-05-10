import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { CheckStatus } from '../entities/check-status.entity';

export class ResCheckStatus {
  id: string;
  name: string;
  color: string;
  description: string;
  display_index: string;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];
  cleans: ResClean[];

  constructor(json?: CheckStatus) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.description = json?.Description;
    this.display_index = json?.DisplayIndex;
    this.rooms = json?.Rooms ? Mapper.map(ResRoom, json.Rooms) : null;
    this.public_areas = json?.PublicAreas
      ? Mapper.map(ResPublicArea, json.PublicAreas)
      : null;
    this.cleans = json?.Cleans ? Mapper.map(ResClean, json.Cleans) : null;
  }
}

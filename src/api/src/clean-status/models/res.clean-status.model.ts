import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { CleanStatus } from '../entities/clean-status.entity';

export class ResCleanStatus {
  id: string;
  name: string;
  color: string;
  description: string;
  rooms: ResRoom[];
  public_areas: ResPublicArea[];
  display_index: string;
  cleans: ResClean[];

  constructor(json?: CleanStatus) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.color = json?.Color;
    this.display_index = json?.DisplayIndex;
    this.description = json?.Description;
    this.rooms = json?.Rooms ? Mapper.map(ResRoom, json.Rooms) : null;
    this.public_areas = json?.PublicAreas
      ? Mapper.map(ResPublicArea, json.PublicAreas)
      : null;
    this.cleans = json?.Cleans ? Mapper.map(ResClean, json.Cleans) : null;
  }
}

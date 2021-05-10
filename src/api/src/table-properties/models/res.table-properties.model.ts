import { TableProperties } from '../entities/table-properties.entity';

export class ResTableProperties {
  id: string;
  name: string;
  description: string;
  data: string;

  constructor(json?: TableProperties) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.data = json?.Data;
  }
}

import { Brand } from '../entities/brand.entity';

export class ResBrand {
  id: string;
  name: string;
  description: string;

  constructor(json?: Brand) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
  }
}

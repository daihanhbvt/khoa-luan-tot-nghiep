import { Category } from '../entities/category.entity';

export class ResCategory {
  id: string;
  name: string;
  description: string;

  constructor(json?: Category) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
  }
}

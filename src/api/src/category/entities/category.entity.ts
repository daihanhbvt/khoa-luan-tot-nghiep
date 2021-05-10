import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  TreeChildren,
  TreeParent,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_category' })
export class Category extends BaseSystemEntity {
  @TreeParent()
  Parent: Category;

  @TreeChildren()
  Children: Category[];
}

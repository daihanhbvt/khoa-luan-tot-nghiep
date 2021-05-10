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
@Entity({ name: 'hkm_table_properties' })
export class TableProperties extends BaseSystemEntity {
  @Column({ name: 'data', type: 'json', nullable: true })
  public Data: string;

  @TreeParent()
  Parent: TableProperties;

  @TreeChildren()
  Children: TableProperties[];
}

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
@Entity({ name: 'hkm_room_status_template' })
export class RoomStatusTemplate extends BaseSystemEntity {
  @TreeParent()
  Parent: RoomStatusTemplate;

  @TreeChildren()
  Children: RoomStatusTemplate[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @Column({ name: 'color', type: 'varchar', length: 15, nullable: true })
  public Color: string;
}

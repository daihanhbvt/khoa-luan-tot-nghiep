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
@Entity({ name: 'hkm_room_type_template' })
export class RoomTypeTemplate extends BaseSystemEntity {
  @TreeParent()
  Parent: RoomTypeTemplate;

  @TreeChildren()
  Children: RoomTypeTemplate[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;
}

import { Room } from 'src/room/entities/room.entity';
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
@Entity({ name: 'hkm_room_type' })
export class RoomType extends BaseSystemEntity {
  @OneToMany(
    () => Room,
    room => room.RoomType,
  )
  Rooms: Room[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @TreeParent()
  Parent: RoomType;

  @TreeChildren()
  Children: RoomType[];
}

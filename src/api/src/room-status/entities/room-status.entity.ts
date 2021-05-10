import { Booked } from 'src/booked/entities/booked.entity';
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
@Entity({ name: 'hkm_room_status' })
export class RoomStatus extends BaseSystemEntity {
  @OneToMany(
    () => Room,
    room => room.RoomStatus,
  )
  Rooms: Room[];

  @OneToMany(
    () => Booked,
    booked => booked.RoomStatus,
  )
  Bookeds: Booked[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @Column({ name: 'color', type: 'varchar', length: 15, nullable: true })
  public Color: string;

  @TreeParent()
  Parent: RoomStatus;

  @TreeChildren()
  Children: RoomStatus[];
}

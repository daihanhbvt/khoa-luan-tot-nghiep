import { Customer } from 'src/customer/entities/customer.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { Room } from 'src/room/entities/room.entity';
import {
  Entity,
  Column,
  TreeChildren,
  TreeParent,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_booked' })
export class Booked extends BaseSystemEntity {
  @Column({ name: 'room_id', type: 'char', length: 64, nullable: true })
  RoomId: string;

  @ManyToOne(
    () => Room,
    room => room.Bookeds,
  )
  @JoinColumn({ name: 'room_id' })
  Room: Room;

  @Column({ name: 'customer_id', type: 'char', length: 64, nullable: true })
  CustomerId: string;

  @ManyToOne(
    () => Customer,
    customer => customer.Bookeds,
  )
  @JoinColumn({ name: 'customer_id' })
  Customer: Customer;

  @Column({ name: 'room_status_id', type: 'char', length: 64, nullable: true })
  RoomStatusId: string;

  @ManyToOne(
    () => RoomStatus,
    roomStatus => roomStatus.Bookeds,
  )
  @JoinColumn({ name: 'room_status_id' })
  RoomStatus: RoomStatus;

  @Column({ name: 'from_date', type: 'datetime', nullable: true })
  public FromDate: Date;

  @Column({ name: 'to_date', type: 'datetime', nullable: true })
  public ToDate: Date;

  @TreeParent()
  Parent: Booked;

  @TreeChildren()
  Children: Booked[];
}

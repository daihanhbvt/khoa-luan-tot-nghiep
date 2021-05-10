import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Booked } from 'src/booked/entities/booked.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { Floors } from 'src/floors/entities/floors.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import {
  Entity,
  TreeChildren,
  TreeParent,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_room' })
export class Room extends BaseSystemEntity {
  @Column({ name: 'floors_id', type: 'char', length: 64, nullable: true })
  FloorsId: string;

  @ManyToOne(
    () => Floors,
    floors => floors.Rooms,
  )
  @JoinColumn({ name: 'floors_id' })
  Floors: Floors;

  @Column({ name: 'room_status_id', type: 'char', length: 64, nullable: true })
  RoomStatusId: string;

  @ManyToOne(
    () => RoomStatus,
    roomStatus => roomStatus.Rooms,
  )
  @JoinColumn({ name: 'room_status_id' })
  RoomStatus: RoomStatus;

  @Column({ name: 'clean_status_id', type: 'char', length: 64, nullable: true })
  CleanStatusId: string;

  @ManyToOne(
    () => CleanStatus,
    cleanStatus => cleanStatus.Rooms,
  )
  @JoinColumn({ name: 'clean_status_id' })
  CleanStatus: CleanStatus;

  @Column({ name: 'check_status_id', type: 'char', length: 64, nullable: true })
  CheckStatusId: string;

  @ManyToOne(
    () => CheckStatus,
    checkStatus => checkStatus.Rooms,
  )
  @JoinColumn({ name: 'check_status_id' })
  CheckStatus: CheckStatus;

  @Column({ name: 'room_type_id', type: 'char', length: 64, nullable: true })
  RoomTypeId: string;

  @ManyToOne(
    () => RoomType,
    roomType => roomType.Rooms,
  )
  @JoinColumn({ name: 'room_type_id' })
  RoomType: RoomType;

  @OneToMany(
    () => Assignment,
    assignment => assignment.Room,
  )
  Assignments: Assignment[];

  @OneToMany(
    () => Booked,
    booked => booked.Room,
  )
  Bookeds: Booked[];

  @TreeParent()
  Parent: Room;

  @TreeChildren()
  Children: Room[];
}

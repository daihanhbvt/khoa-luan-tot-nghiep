import { Hotel } from 'src/hotel/entities/hotel.entity';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
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
@Entity({ name: 'hkm_floors' })
export class Floors extends BaseSystemEntity {
  @Column({ name: 'hotel_id', type: 'char', length: 64, nullable: true })
  HotelId: string;

  @ManyToOne(
    () => Hotel,
    hotel => hotel.Floorses,
  )
  @JoinColumn({ name: 'hotel_id' })
  Hotel: Hotel;

  @OneToMany(
    () => Room,
    room => room.Floors,
  )
  Rooms: Room[];

  @OneToMany(
    () => PublicArea,
    publicArea => publicArea.Floors,
  )
  PublicAreas: PublicArea[];

  @TreeParent()
  Parent: Floors;

  @TreeChildren()
  Children: Floors[];
}

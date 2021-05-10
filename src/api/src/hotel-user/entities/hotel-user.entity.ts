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
@Entity({ name: 'hkm_hotel_user' })
export class HotelUser extends BaseSystemEntity {
  @Column({ name: 'data', type: 'json', nullable: true })
  public Data: string;

  @TreeParent()
  Parent: HotelUser;

  @TreeChildren()
  Children: HotelUser[];
}

import { Floors } from 'src/floors/entities/floors.entity';
import { Entity, Column, TreeChildren, TreeParent, OneToMany } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_hotel' })
export class Hotel extends BaseSystemEntity {
  @Column({ name: 'email', type: 'varchar', length: 150, nullable: true })
  public Email: string;

  @Column({ name: 'owner', type: 'varchar', length: 150, nullable: true })
  public Owner: string;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: true })
  public Phone: string;

  @Column({ name: 'address', type: 'varchar', length: 150, nullable: true })
  public Address: string;

  @Column({ name: 'start', type: 'varchar', length: 150, nullable: true })
  public Start: string;

  @Column({ name: 'company_id', type: 'char', length: 64, nullable: true })
  public CompanyId: string;

  @OneToMany(
    () => Floors,
    floors => floors.Hotel,
  )
  Floorses: Floors[];

  @TreeParent()
  Parent: Hotel;

  @TreeChildren()
  Children: Hotel[];
}

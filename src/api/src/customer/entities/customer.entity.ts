import { Booked } from 'src/booked/entities/booked.entity';
import { Entity, Column, TreeChildren, TreeParent, OneToMany } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_customer' })
export class Customer extends BaseSystemEntity {
  @Column({ name: 'birthday', type: 'date', nullable: true })
  public Birthday: Date;

  @Column({ name: 'phone', type: 'varchar', length: 15, nullable: true })
  public Phone: string;

  @Column({ name: 'address', type: 'varchar', length: 150, nullable: true })
  public Address: string;

  @Column({ name: 'email', type: 'varchar', length: 150, nullable: true })
  public Email: string;

  @Column({ name: 'gender', type: 'varchar', length: 15, nullable: true })
  public Gender: string;

  @Column({
    name: 'identity_card',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public IdentityCard: string;

  @Column({ name: 'login_code', type: 'varchar', length: 6, nullable: true })
  public LoginCode: string;

  @Column({
    name: 'logincode_expired',
    type: 'varchar',
    length: 6,
    nullable: true,
  })
  public LogincodeExpired: string;

  @OneToMany(
    () => Booked,
    booked => booked.Customer,
  )
  Bookeds: Booked[];

  @TreeParent()
  Parent: Customer;

  @TreeChildren()
  Children: Customer[];
}

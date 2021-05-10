import { Entity, TreeChildren, TreeParent, OneToMany, Column } from 'typeorm';
import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_init' })
export class Init extends BaseSystemEntity {
  @TreeParent()
  Parent: Init;

  @TreeChildren()
  Children: Init[];
}

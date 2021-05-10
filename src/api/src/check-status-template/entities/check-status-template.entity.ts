import { Entity, TreeChildren, TreeParent, OneToMany, Column } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_status_template' })
export class CheckStatusTemplate extends BaseSystemEntity {
  @TreeParent()
  Parent: CheckStatusTemplate;

  @TreeChildren()
  Children: CheckStatusTemplate[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @Column({ name: 'color', type: 'varchar', length: 15, nullable: true })
  public Color: string;

}

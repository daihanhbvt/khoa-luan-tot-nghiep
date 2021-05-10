import { Entity, TreeChildren, TreeParent, OneToMany, Column } from 'typeorm';
import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_clean_status_template' })
export class CleanStatusTemplate extends BaseSystemEntity {
  @TreeParent()
  Parent: CleanStatusTemplate;

  @TreeChildren()
  Children: CleanStatusTemplate[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @Column({ name: 'color', type: 'varchar', length: 15, nullable: true })
  public Color: string;
}

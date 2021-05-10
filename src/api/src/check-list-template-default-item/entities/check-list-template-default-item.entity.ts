import { CheckListTemplateDefault } from 'src/check-list-template-default/entities/check-list-template-default.entity';
import {
  Entity,
  TreeChildren,
  TreeParent,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_list_template_default_item' })
export class CheckListTemplateDefaultItem extends BaseSystemEntity {
  @Column({
    name: 'check_list_template_default_id',
    type: 'char',
    length: 64,
    nullable: true,
  })
  CheckListTemplateDefaultId: string;

  @ManyToOne(
    () => CheckListTemplateDefault,
    checkListTemplateDefault =>
      checkListTemplateDefault.CheckListTemplateDefaultItems,
  )
  @JoinColumn({ name: 'check_list_template_default_id' })
  CheckListTemplateDefault: CheckListTemplateDefault;

  @TreeParent()
  Parent: CheckListTemplateDefaultItem;

  @TreeChildren()
  Children: CheckListTemplateDefaultItem[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;
}

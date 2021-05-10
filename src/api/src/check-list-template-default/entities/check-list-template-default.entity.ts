import { CheckListTemplateDefaultItem } from 'src/check-list-template-default-item/entities/check-list-template-default-item.entity';
import { Entity, TreeChildren, TreeParent, OneToMany, Column } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_list_template_default' })
export class CheckListTemplateDefault extends BaseSystemEntity {
  @OneToMany(
    () => CheckListTemplateDefaultItem,
    checkListTemplateDefaultItem =>
      checkListTemplateDefaultItem.CheckListTemplateDefault,
  )
  CheckListTemplateDefaultItems: CheckListTemplateDefaultItem[];

  @TreeParent()
  Parent: CheckListTemplateDefault;

  @TreeChildren()
  Children: CheckListTemplateDefault[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;
}

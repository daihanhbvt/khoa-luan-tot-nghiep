import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  TreeChildren,
  TreeParent,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_list_template_item' })
export class CheckListTemplateItem extends BaseSystemEntity {
  @Column({
    name: 'check_list_template_id',
    type: 'char',
    length: 64,
    nullable: true,
  })
  CheckListTemplateId: string;

  @ManyToOne(
    () => CheckListTemplate,
    checkListTemplate => checkListTemplate.CheckListTemplateItems,
  )
  @JoinColumn({ name: 'check_list_template_id' })
  CheckListTemplate: CheckListTemplate;

  @TreeParent()
  Parent: CheckListTemplateItem;

  @TreeChildren()
  Children: CheckListTemplateItem[];
}

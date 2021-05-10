import { CheckListItem } from 'src/check-list-item/entities/check-list-item.entity';
import { CheckListResult } from 'src/check-list-result/entities/check-list-result.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { Clean } from 'src/clean/entities/clean.entity';
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
@Entity({ name: 'hkm_check_list' })
export class CheckList extends BaseSystemEntity {
  @Column({name: 'check_list_template_id',type: 'char',length: 64,nullable: true,})
  CheckListTemplateId: string;

  @ManyToOne(
    () => CheckListTemplate,
    checkListTemplate => checkListTemplate.CheckLists,
  )
  @JoinColumn({ name: 'check_list_template_id' })
  CheckListTemplate: CheckListTemplate;

  @OneToMany(
    () => CheckListItem,
    checkListItem => checkListItem.CheckList,
  )
  CheckListItems: CheckListItem[];

  @OneToMany(
    () => CheckListResult,
    checkListresult => checkListresult.CheckList,
  )
  CheckListResults: CheckListResult[];

  @Column({ name: 'display_index', type: 'varchar', length: 15, nullable: true })
  public DisplayIndex: string;

  @Column({ name: 'clean_id', type: 'char', length: 64, nullable: true })
  CleanId: string;

  @ManyToOne(() => Clean,clean => clean.CheckLists,)
  @JoinColumn({ name: 'clean_id' })
  Clean: Clean;

  @TreeParent()
  Parent: CheckList;

  @TreeChildren()
  Children: CheckList[];
  static CheckListItem: any;
}

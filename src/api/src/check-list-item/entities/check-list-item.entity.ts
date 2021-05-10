import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListResult } from 'src/check-list-result/entities/check-list-result.entity';
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
@Entity({ name: 'hkm_check_list_item' })
export class CheckListItem extends BaseSystemEntity {
  @Column({ name: 'check_list_id', type: 'char', length: 64, nullable: true })
  CheckListId: string;

  @ManyToOne(
    () => CheckList,
    checkList => checkList.CheckListItems,
  )
  @JoinColumn({ name: 'check_list_id' })
  CheckList: CheckList;

  @OneToMany(
    () => CheckListResult,
    checkListResult => checkListResult.CheckListItem,
  )
  CheckListResults: CheckListResult[];

  @TreeParent()
  Parent: CheckListItem;

  @TreeChildren()
  Children: CheckListItem[];
}

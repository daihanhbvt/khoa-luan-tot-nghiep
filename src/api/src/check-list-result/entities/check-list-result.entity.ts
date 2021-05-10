import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListItem } from 'src/check-list-item/entities/check-list-item.entity';
import {
  Entity,
  TreeChildren,
  TreeParent,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_list_result' })
export class CheckListResult extends BaseSystemEntity {
  @Column({ name: 'check_list_id', type: 'char', length: 64, nullable: true })
  CheckListId: string;

  @ManyToOne(
    () => CheckList,
    checkList => checkList.CheckListResults,
  )
  @JoinColumn({ name: 'check_list_id' })
  CheckList: CheckList;

  @Column({
    name: 'check_list_item_id',
    type: 'char',
    length: 64,
    nullable: true,
  })
  CheckListItemId: string;

  @ManyToOne(
    () => CheckListItem,
    checkListItem => checkListItem.CheckListResults,
  )
  @JoinColumn({ name: 'check_list_item_id' })
  CheckListItem: CheckListItem;

  @TreeParent()
  Parent: CheckListResult;

  @TreeChildren()
  Children: CheckListResult[];
}

import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListTemplateItem } from 'src/check-list-template-item/entities/check-list-template-item.entity';
import { Floors } from 'src/floors/entities/floors.entity';
import { Room } from 'src/room/entities/room.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import {
  Entity,
  TreeChildren,
  TreeParent,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  Column,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_list_template' })
export class CheckListTemplate extends BaseSystemEntity {
  @Column({ name: 'room_type_id', type: 'char', length: 64, nullable: true })
  RoomTypeId: string;

  @OneToOne(() => RoomType)
  @JoinColumn({ name: 'room_type_id' })
  RoomType: RoomType;

  @OneToMany(() => Assignment, assignment => assignment.CheckListTemplate)
  Assignments: Assignment[];

  @Column({ name: 'floors_id', type: 'char', length: 64, nullable: true })
  FloorsId: string;

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @OneToOne(() => Floors)
  @JoinColumn({ name: 'floors_id' })
  Floors: Floors;

  @Column({ name: 'room_id', type: 'char', length: 64, nullable: true })
  RoomId: string;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  Room: Room;

  @OneToMany(
    () => CheckList,
    checkList => checkList.CheckListTemplate,
  )
  CheckLists: CheckList[];

  @OneToMany(
    () => CheckListTemplateItem,
    checkListTemplateItem => checkListTemplateItem.CheckListTemplate,
  )
  CheckListTemplateItems: CheckListTemplateItem[];

  @TreeParent()
  Parent: CheckListTemplate;

  @TreeChildren()
  Children: CheckListTemplate[];
}

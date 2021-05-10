import { Assignment } from 'src/assignment/entities/assignment.entity';
import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { Comment } from 'src/comment/entities/comment.entity';
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
@Entity({ name: 'hkm_clean' })
export class Clean extends BaseSystemEntity {
  @Column({ name: 'assignment_id', type: 'char', length: 64, nullable: true })
  AssignmentId: string;

  @ManyToOne(
    () => Assignment,
    assignment => assignment.Cleans
  )
  @JoinColumn({ name: 'assignment_id' })
  Assignment: Assignment;

  @Column({ name: 'clean_status_id', type: 'char', length: 64, nullable: true })
  CleanStatusId: string;

  @ManyToOne(() => CleanStatus,cleanStatus => cleanStatus.Cleans)
  @JoinColumn({ name: 'clean_status_id' })
  CleanStatus: CleanStatus;


  @Column({ name: 'check_status_id', type: 'char', length: 64, nullable: true })
  CheckStatusId: string;

  @ManyToOne(() => CheckStatus,checkStatus => checkStatus.Cleans)
  @JoinColumn({ name: 'check_status_id' })
  CheckStatus: CheckStatus;

  @OneToMany(() => CheckList,checkList => checkList.Clean)
  CheckLists: CheckList[];
  
  @OneToMany(() => Comment,comment => comment.Clean)
  Comments: Comment[];

  @TreeParent()
  Parent: Clean;

  @TreeChildren()
  Children: Clean[];
}

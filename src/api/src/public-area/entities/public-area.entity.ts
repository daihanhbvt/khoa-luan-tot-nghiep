import { Assignment } from 'src/assignment/entities/assignment.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { Floors } from 'src/floors/entities/floors.entity';
import {
  Entity,
  TreeChildren,
  TreeParent,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_public_area' })
export class PublicArea extends BaseSystemEntity {
  @OneToMany(
    () => Assignment,
    assignment => assignment.PublicArea,
  )
  Assignments: Assignment[];

  @Column({ name: 'clean_status_id', type: 'char', length: 64, nullable: true })
  CleanStatusId: string;

  @ManyToOne(
    () => CleanStatus,
    cleanStatus => cleanStatus.PublicAreas,
  )
  @JoinColumn({ name: 'clean_status_id' })
  CleanStatus: CleanStatus;

  @Column({ name: 'check_status_id', type: 'char', length: 64, nullable: true })
  CheckStatusId: string;

  @ManyToOne(
    () => CheckStatus,
    checkStatus => checkStatus.PublicAreas,
  )
  @JoinColumn({ name: 'check_status_id' })
  CheckStatus: CheckStatus;

  @Column({ name: 'floors_id', type: 'char', length: 64, nullable: true })
  FloorsId: string;

  @ManyToOne(
    () => Floors,
    floors => floors.PublicAreas,
  )
  @JoinColumn({ name: 'floors_id' })
  Floors: Floors;

  @TreeParent()
  Parent: PublicArea;

  @TreeChildren()
  Children: PublicArea[];
}

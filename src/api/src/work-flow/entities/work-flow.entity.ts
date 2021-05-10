import { Clean } from 'src/clean/entities/clean.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, TreeParent, TreeChildren } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_work_flow' })
export class WorkFlow extends BaseSystemEntity {

  @TreeParent()
  NextStep: WorkFlow;

  @TreeChildren()
  PreviewStep: WorkFlow[];
}

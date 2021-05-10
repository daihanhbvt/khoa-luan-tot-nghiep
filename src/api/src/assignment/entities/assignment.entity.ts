import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { Clean } from 'src/clean/entities/clean.entity';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_assignment' })
export class Assignment extends BaseSystemEntity {

  @Column({ name: 'clean_id', type: 'char', length: 64, nullable: true })
  CleanId: string;
  @OneToMany(() => Clean,clean => clean.Assignment,)
  Cleans: Clean[];

  @Column({ name: 'room_id', type: 'char', length: 64, nullable: true })
  RoomId: string;

  @ManyToOne(   () => Room,   room => room.Assignments, )
  @JoinColumn({ name: 'room_id' })
  Room: Room;

  

  @Column({ name: 'checklist_template_id', type: 'char', length: 64, nullable: true })
  CheckListTemplateId: string;

  @ManyToOne(   () => CheckListTemplate,   checkListTemplate => checkListTemplate.Assignments, )
  @JoinColumn({ name: 'checklist_template_id' })
  CheckListTemplate: CheckListTemplate;

  @Column({ name: 'public_area_id', type: 'char', length: 64, nullable: true })
  PublicAreaId: string;

  @ManyToOne(
    () => PublicArea,
    publicArea => publicArea.Assignments,
  )
  @JoinColumn({ name: 'public_area_id' })
  PublicArea: PublicArea;

  @Column({ name: 'clean_date', type: 'datetime', nullable: true })
  public CleanDate: Date;

  // @Column({ name: 'to_date', type: 'datetime', nullable: true })
  // public ToDate: Date;

  @Column({ name: 'employee_id', type: 'char', length: 64, nullable: true })
  public EmployeeId: string;

  @Column({ name: 'supervisor_Id', type: 'char', length: 64, nullable: true })
  public SupervisorId: string;


}

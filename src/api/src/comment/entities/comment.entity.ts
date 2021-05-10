import { Clean } from 'src/clean/entities/clean.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn, TreeParent, TreeChildren } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_comment' })
export class Comment extends BaseSystemEntity {

  @ManyToOne(() => Clean,clean => clean.Comments)
  @JoinColumn({ name: 'clean_id' })
  Clean: Clean;

  @Column({ name: 'clean_id', type: 'char', length: 64, nullable: true })
  CleanId: string;

  @Column({ name: 'user_id', type: 'char', length: 64, nullable: true })
  public UserId: string;

  @Column({ name: 'content', type: 'longtext', nullable: true })
  public Content: string;


  @TreeParent()
  Parent: Comment;

  @TreeChildren()
  Children: Comment[];
}

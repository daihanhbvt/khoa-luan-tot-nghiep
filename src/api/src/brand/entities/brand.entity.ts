import { BaseSystemEntity } from '../../entities/base-system-entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  TreeParent,
  TreeChildren,
  ManyToMany,
  JoinTable,
} from 'typeorm';
/**
 * [Id,
 * Name
 * Description
 * SiteId
 * created_date
 * Flags
 * last_update_date
 * ]
 */

/**
 * hkm_product
 */
@Entity({ name: 'hkm_brand' })
export class Brand extends BaseSystemEntity {}

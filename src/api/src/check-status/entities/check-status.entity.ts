import { Clean } from 'src/clean/entities/clean.entity';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
import { Entity, TreeChildren, TreeParent, OneToMany, Column } from 'typeorm';

import { BaseSystemEntity } from '../../entities/base-system-entity';
/**
 * hkm_product
 */
@Entity({ name: 'hkm_check_status' })
export class CheckStatus extends BaseSystemEntity {
  @OneToMany(
    () => Room,
    room => room.CheckStatus,
  )
  Rooms: Room[];

  @OneToMany(
    () => PublicArea,
    publicArea => publicArea.CheckStatus,
  )
  PublicAreas: PublicArea[];

  @OneToMany(
    () => Clean,
    clean => clean.CheckStatus,
  )
  Cleans: Clean[];

  @Column({ name: 'is_default', type: 'bool', default: false })
  IsDefault: boolean;

  @Column({ name: 'color', type: 'varchar', length: 15, nullable: true })
  public Color: string;

  @Column({ name: 'display_index', type: 'varchar', length: 15, nullable: true })
  public DisplayIndex: string;

  @TreeParent()
  Parent: CheckStatus;

  @TreeChildren()
  Children: CheckStatus[];
}

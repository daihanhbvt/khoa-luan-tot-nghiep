import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../entities/room-type.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqRoomType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: RoomType) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.is_default = json?.IsDefault || false;
  }
  public static runValidator(roomType: ReqRoomType) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(roomType.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

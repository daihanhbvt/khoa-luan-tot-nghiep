import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '../entities/room-status.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqRoomStatus {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: RoomStatus) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.color = json?.Color || '';
    this.is_default = json?.IsDefault || false;
  }
  public static runValidator(roomStatus: ReqRoomStatus) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(roomStatus.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

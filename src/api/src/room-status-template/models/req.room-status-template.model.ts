import { ApiProperty } from '@nestjs/swagger';
import { RoomStatusTemplate } from '../entities/room-status-template.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqRoomStatusTemplate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  color: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: RoomStatusTemplate) {
    this.name = json?.Name || '';
    this.color = json?.Color || '';
    this.description = json?.Description || '';
  }
  public static runValidator(roomStatusTemplate: ReqRoomStatusTemplate) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(roomStatusTemplate.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }
    return messages;
  }
}

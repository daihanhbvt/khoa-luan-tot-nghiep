import { ApiProperty } from '@nestjs/swagger';
import { Room } from '../entities/room.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqRoom {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  floors_id: string;

  @ApiProperty()
  room_status_id: string;

  @ApiProperty()
  clean_status_id: string;

  @ApiProperty()
  check_status_id: string;

  @ApiProperty()
  room_type_id: string;

  constructor(json?: Room) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.floors_id = json?.FloorsId || '';
    this.room_status_id = json?.RoomStatusId || '';
    this.clean_status_id = json?.CleanStatusId || '';
    this.check_status_id = json?.CheckStatusId || '';
    this.room_type_id = json?.RoomStatusId || '';
  }
  public static runValidator(room: ReqRoom) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(room.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!room.floors_id) {
      messages.push({
        field: 'floors_id',
        message: Consts.MSG_FIELD_REQUIRED('floors_id'),
      });
    }

    if (!room.room_type_id) {
      messages.push({
        field: 'room_type_id',
        message: Consts.MSG_FIELD_REQUIRED('room_type_id'),
      });
    }

    return messages;
  }
}

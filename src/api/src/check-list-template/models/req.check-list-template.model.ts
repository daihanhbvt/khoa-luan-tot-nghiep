import { ApiProperty } from '@nestjs/swagger';
import { CheckListTemplate } from '../entities/check-list-template.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqCheckListTemplate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  room_type_id: string;

  @ApiProperty()
  floors_id: string;

  @ApiProperty()
  room_id: string;

  @ApiProperty({ default: false })
  is_default: boolean;

  constructor(json?: CheckListTemplate) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.room_type_id = json?.RoomTypeId || '';
    this.floors_id = json?.FloorsId || '';
    this.room_id = json?.RoomId || '';
    this.is_default = json?.IsDefault || false;
  }
  public static runValidator(checkListTemplate: ReqCheckListTemplate) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(checkListTemplate.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (
      !checkListTemplate.room_type_id &&
      !checkListTemplate.floors_id &&
      !checkListTemplate.room_id
    ) {
      messages.push({
        field: 'room_type_id',
        message: Consts.MSG_FIELD_REQUIRED('room_type_id'),
      });
      messages.push({
        field: 'floors_id',
        message: Consts.MSG_FIELD_REQUIRED('floors_id'),
      });
      messages.push({
        field: 'room_id',
        message: Consts.MSG_FIELD_REQUIRED('room_id'),
      });
    }
    return messages;
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Booked } from '../entities/booked.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqBooked {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  from_date: Date;

  @ApiProperty()
  to_date: Date;

  @ApiProperty()
  room_id: string;

  @ApiProperty()
  customer_id: string;

  @ApiProperty()
  room_status_id: string;

  constructor(json?: Booked) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.from_date = json?.FromDate || undefined;
    this.to_date = json?.ToDate || undefined;
    this.room_id = json?.RoomId || '';
    this.customer_id = json?.CustomerId || '';
    this.room_status_id = json?.RoomStatusId || '';
  }
  public static runValidator(booked: ReqBooked) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(booked.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!booked.room_id) {
      messages.push({
        field: 'room_id',
        message: Consts.MSG_FIELD_REQUIRED('room_id'),
      });
    }

    if (!booked.customer_id) {
      messages.push({
        field: 'customer_id',
        message: Consts.MSG_FIELD_REQUIRED('customer_id'),
      });
    }

    if (!booked.room_status_id) {
      messages.push({
        field: 'room_status_id',
        message: Consts.MSG_FIELD_REQUIRED('room_status_id'),
      });
    }
    return messages;
  }
}

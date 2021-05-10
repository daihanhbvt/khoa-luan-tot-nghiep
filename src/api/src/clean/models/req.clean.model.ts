import { ApiProperty } from '@nestjs/swagger';
import { Clean } from '../entities/clean.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from './../../common/consts';

export class ReqClean {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
  @ApiProperty()
  assignment_id: string;
  @ApiProperty()
  clean_status_id: string;
  @ApiProperty()
  check_status_id: string;

  constructor(json?: Clean) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.assignment_id = json?.AssignmentId || '';
    this.clean_status_id = json?.CleanStatusId || '';
    this.check_status_id = json?.CheckStatusId || '';
  }
  public static runValidator(clean: ReqClean) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(clean.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!clean.clean_status_id) {
      messages.push({
        field: 'clean_status_id',
        message: Consts.MSG_FIELD_REQUIRED('clean_status_id'),
      });
    }

    if (!clean.check_status_id) {
      messages.push({
        field: 'check_status_id',
        message: Consts.MSG_FIELD_REQUIRED('check_status_id'),
      });
    }

    if (!clean.assignment_id) {
      messages.push({
        field: 'assignment_id',
        message: Consts.MSG_FIELD_REQUIRED('assignment_id'),
      });
    }
    return messages;
  }
}

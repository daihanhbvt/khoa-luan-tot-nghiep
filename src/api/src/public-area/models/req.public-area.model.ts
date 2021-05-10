import { ApiProperty } from '@nestjs/swagger';
import { PublicArea } from '../entities/public-area.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqPublicArea {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  clean_status_id: string;
  @ApiProperty()
  check_status_id: string;
  @ApiProperty()
  floors_id: string;

  constructor(json?: PublicArea) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.clean_status_id = json?.CleanStatusId || '';
    this.check_status_id = json?.CheckStatusId || '';
    this.floors_id = json?.FloorsId || '';
  }
  public static runValidator(publicArea: ReqPublicArea) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    if (validator.isEmpty(publicArea.name)) {
      messages.push({
        field: BaseFields.Name,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
      });
    }

    if (!publicArea.clean_status_id) {
      messages.push({
        field: 'clean_status_id',
        message: Consts.MSG_FIELD_REQUIRED('clean_status_id'),
      });
    }

    if (!publicArea.check_status_id) {
      messages.push({
        field: 'check_tatus_id',
        message: Consts.MSG_FIELD_REQUIRED('check_tatus_id'),
      });
    }

    if (!publicArea.floors_id) {
      messages.push({
        field: 'floor_id',
        message: Consts.MSG_FIELD_REQUIRED('floor_id'),
      });
    }
    return messages;
  }
}

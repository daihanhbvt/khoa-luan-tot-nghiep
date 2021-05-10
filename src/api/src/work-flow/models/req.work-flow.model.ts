import { ApiProperty } from '@nestjs/swagger';
import { WorkFlow } from '../entities/work-flow.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqWorkFlow {


  constructor(json?: WorkFlow) {
  }
  public static runValidator(assignment: ReqWorkFlow) {
    const messages = [];
    // Validation methods
    const validator = new Validator();
    // vailidate name
    // if (validator.isEmpty(assignment.name)) {
    //   messages.push({
    //     field: BaseFields.Name,
    //     message: Consts.MSG_FIELD_REQUIRED(BaseFields.Name),
    //   });
    // }

    // if (!assignment.public_area_id) {
    //   messages.push({
    //     field: 'public_area_id',
    //     message: Consts.MSG_FIELD_REQUIRED('public_area_id'),
    //   });
    // }

    // if (!assignment.room_id) {
    //   messages.push({
    //     field: 'room_id',
    //     message: Consts.MSG_FIELD_REQUIRED('room_id'),
    //   });
    // }
    return messages;
  }
}

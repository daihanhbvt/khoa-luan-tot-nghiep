import { ApiProperty } from '@nestjs/swagger';
import { Assignment } from '../entities/assignment.entity';
import { Validator } from 'class-validator';
import { BaseFields } from 'src/entities/base-system-fields';
import * as Consts from '../../common/consts';

export class ReqAssignment {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  room_id: string;

  @ApiProperty()
  public_area_id: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty()
  supervisor_id: string;

  @ApiProperty()
  checklist_template_id: string;
  

  @ApiProperty()
  clean_date: Date;


  constructor(json?: Assignment) {
    this.name = json?.Name || '';
    this.description = json?.Description || '';
    this.room_id = json?.RoomId || '';
    this.public_area_id = json?.PublicAreaId || '';
    this.employee_id = json?.EmployeeId || '';
    this.checklist_template_id = json?.CheckListTemplateId || '';
    this.supervisor_id = json?.SupervisorId || '';
    this.clean_date = json?.CleanDate || undefined;
  }
  public static runValidator(assignment: ReqAssignment) {
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

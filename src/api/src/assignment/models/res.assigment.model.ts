import { ResUser } from 'src/base-model/res.user.model';
import { ResCheckListTemplate } from 'src/check-list-template/models/res.check-list-template.model';
import { ResClean } from 'src/clean/models/res.clean.model';
import { Mapper } from 'src/common';
import { ResFloors } from 'src/floors/models/res.floors.model';
import { ResPublicArea } from 'src/public-area/models/res.public-area.model';
import { ResRoom } from 'src/room/models/res.room.model';
import { Assignment } from '../entities/assignment.entity';

export class ResAssignment {
  id: string;
  name: string;
  description: string;
  clean_date: Date;
  floors: ResFloors;
  room: ResRoom;
  public_area: ResPublicArea;
  clean: ResClean;
  employee_id: string;
  supervisor_id: string;
  employee: any;
  supervisor: any;
  checklist_template_id: string;
  checklist_template: ResCheckListTemplate;
  last_updated_by: ResUser;
  constructor(json?: Assignment | any) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    this.clean_date = json?.CleanDate;

    this.employee_id = json?.EmployeeId;
    this.supervisor_id = json?.SupervisorId;
    this.floors = json?.Room && json?.Room.Floors ? Mapper.map(ResFloors, json?.Room.Floors) : json?.PublicArea && json?.PublicArea.Floors ? Mapper.map(ResFloors, json?.PublicArea.Floors) : null;
    this.public_area = json?.PublicArea ? Mapper.map(ResPublicArea, json.PublicArea) : null;
    this.checklist_template = json?.CheckListTemplate ? Mapper.map(ResCheckListTemplate, json.CheckListTemplate) : null;
    this.checklist_template_id = json?.CheckListTemplateId;
    this.clean = json?.Cleans ? Mapper.map(ResClean, json.Cleans) : null;
    this.room = json?.Room ? Mapper.map(ResRoom, json.Room) : null;
    this.employee = json?.EmployeeId ? Mapper.map(ResUser, json.Employee) : null;
    this.supervisor = json?.SupervisorId ? Mapper.map(ResUser, json.Supervisor) : null;
    this.last_updated_by = json?.LastUpdatedBy ? Mapper.map(ResUser, json.LastUpdatedBy) : null;
  }
}

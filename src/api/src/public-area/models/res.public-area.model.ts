import { ResAssignment } from 'src/assignment/models/res.assigment.model';
import { ResCheckStatus } from 'src/check-status/models/res.check-status.model';
import { ResCleanStatus } from 'src/clean-status/models/res.clean-status.model';
import { Mapper } from 'src/common';
import { ResFloors } from 'src/floors/models/res.floors.model';
import { PublicArea } from '../entities/public-area.entity';

export class ResPublicArea {
  id: string;
  name: string;
  description: string;
  //floors_id: string;
  //clean_status_id: string;
  //check_status_id: string;

  floors: ResFloors;
  clean_status: ResCleanStatus;
  check_status: ResCheckStatus;
  assignments: ResAssignment;

  constructor(json?: PublicArea) {
    this.id = json?.Id;
    this.name = json?.Name;
    this.description = json?.Description;
    //this.floors_id = json?.FloorsId;
    //this.clean_status_id = json?.CleanStatusId;
    //this.check_status_id = json?.CheckStatusId;
    this.floors = json?.Floors ? Mapper.map(ResFloors, json.Floors) : null;
    this.clean_status = json?.CleanStatus
      ? Mapper.map(ResCleanStatus, json?.CleanStatus)
      : null;
    this.check_status = json?.CheckStatus
      ? Mapper.map(ResCheckStatus, json?.CheckStatus)
      : null;
    this.assignments = json?.Assignments
      ? Mapper.map(ResAssignment, json.Assignments)
      : null;
  }
}

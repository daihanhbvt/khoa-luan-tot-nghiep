import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { IPagination } from 'src/base-model/pagination-result';
import { Mapper } from 'src/common/mapper';
import {
  GetAllAction,
  Problem,
  GetAction,
  UpdateAction,
  CreateAction,
  DeleteAction,
} from 'src/common';

import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { ResAssignment } from './models/res.assigment.model';
import { ReqAssignment } from './models/req.assigment.model';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { RequestTarget as request } from 'src/common';
@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(PublicArea)
    private publicAreaRepository: Repository<PublicArea>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(CheckListTemplate)
    private checkListTemplateRepository: Repository<CheckListTemplate>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.assignmentRepository.findAndCount({
        where: {
          DeleteFlag: DeleteFlag.None,
          SiteId: req.body.site_id,
          andWhere: [
            {
              Name: Like(`%${paging.filter || ''}%`),
            },
            {
              Description: Like(`%${paging.filter || ''}%`),
            },
          ],
        },
        order: {
          Name: 'ASC',
        },
        //skip: paging.page * paging.pageSize,
        //take: paging.pageSize,
      });

      return {
        data: Mapper.map(ResAssignment, rows[0]),
        paging: {
          page: paging.page,
          pageSize: paging.pageSize,
          count: rows[1],
        },
      } as IPagination;
    } catch (error) {
      Logger.error(GetAllAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async get(req: Request, id: string) {
    try {
      const assignment: any = await this.assignmentRepository.findOne({
        relations: ['Room','Room.Floors', 'Cleans', 'CheckListTemplate', 'CheckListTemplate.CheckListTemplateItems'],
        where: {
          Id: id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        }
      });

      // get updated_by, employee, suppervisor from authAPI
      const userIds = [assignment.LastUpdatedBy, assignment.EmployeeId, assignment.SupervisorId].filter(u => u != undefined);
      if (userIds.length > 0) {
        try {
          req.body.ids = userIds;
          let res: any = await request.post(req, {
            url: `${process.env.AUTH_API}/user/ids`,
          });
          let users = res.data;
          console.log(res);
          console.log('res', res);
          if (res.data && res.data.length > 0) {
            assignment.Employee = users.find(u => u.id === assignment.EmployeeId);
            assignment.Supervisor = users.find(u => u.id === assignment.SupervisorId);
            assignment.LastUpdatedBy = users.find(u => u.id === assignment.LastUpdatedBy);
          }
        } catch (error) { }
      }




      if (!assignment) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Assignment.name));
      }
      return Mapper.map(ResAssignment, assignment);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqAssignment,
  ): Promise<Assignment | Problem> {
    // [1] validate data
    const validMessages = ReqAssignment.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check publicArea id
    let publicArea: PublicArea;
    if (body.public_area_id) {
      try {
        publicArea = await this.publicAreaRepository.findOne({
          Id: body.public_area_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!publicArea) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(PublicArea.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }

    }

    // check publicArea id
    let checkListTemplate: CheckListTemplate;
    if (body.checklist_template_id) {
      try {
        checkListTemplate = await this.checkListTemplateRepository.findOne({
          Id: body.checklist_template_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkListTemplate) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }

    }

    // check room_id
    let room: Room;
    if (body.room_id) {
      try {
        room = await this.roomRepository.findOne({
          Id: body.room_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!room) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }

    }

    try {
      const assignment = new Assignment();
      assignment.Name = body.name;
      assignment.Description = body.description;
      assignment.CleanDate = body.clean_date;
      assignment.PublicArea = publicArea;
      assignment.CheckListTemplate = checkListTemplate;
      assignment.EmployeeId = body.employee_id;
      assignment.SupervisorId = body.supervisor_id;
      assignment.Room = room;

      assignment.setBaseDataInfo(req);

      await this.assignmentRepository.save(assignment);
      return Mapper.map(ResAssignment, assignment);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(req: Request, id: string, body: ReqAssignment): Promise<Assignment | Problem> {
    // [1] validate data
    const validMessages = ReqAssignment.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let assignment: Assignment;
    try {
      assignment = await this.assignmentRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!assignment) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Assignment.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // check hopital id
    let publicArea: PublicArea;
    if (
      body.public_area_id &&
      assignment.PublicAreaId !== body.public_area_id
    ) {
      try {
        publicArea = await this.publicAreaRepository.findOne({
          Id: body.public_area_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!publicArea) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(PublicArea.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // check room id
    let room: Room;
    if (body.room_id && assignment.RoomId !== body.room_id) {
      try {
        room = await this.roomRepository.findOne({
          Id: body.room_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!room) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // check room id
    let checkListTemplate: CheckListTemplate;
    if (body.checklist_template_id && assignment.CheckListTemplateId !== body.checklist_template_id) {
      try {
        checkListTemplate = await this.checkListTemplateRepository.findOne({
          Id: body.checklist_template_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkListTemplate) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      assignment.Name = body.name || assignment.Name;
      assignment.Description = body.description || assignment.Description;
      assignment.CleanDate = body.clean_date || assignment.CleanDate;
      assignment.PublicAreaId = publicArea?.Id || assignment.PublicAreaId;
      assignment.CheckListTemplateId = checkListTemplate?.Id || assignment.CheckListTemplateId;
      assignment.RoomId = room?.Id || assignment.RoomId;
      assignment.EmployeeId = body.employee_id;
      assignment.SupervisorId = body.supervisor_id;

      assignment.setBaseDataInfo(req);

      await this.assignmentRepository.save(assignment);
      return Mapper.map(ResAssignment, assignment);
    } catch (error) {
      Logger.log(UpdateAction.UpdateValue, error);
      return Problem.InternalServerError();
    }
  }

  async delete(req: Request, id: string): Promise<Problem> {
    // Check id
    if (!id) {
      return new Problem({
        status: HttpStatus.BAD_REQUEST,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Id),
      });
    }
    // Get assignment by id from db
    let assignment;
    try {
      assignment = await this.assignmentRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!assignment) {
        return Problem.NotFound(assignment.MSG_OBJ_NOT_FOUND(Assignment.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      assignment.DeleteFlag = DeleteFlag.Yes;
      await this.assignmentRepository.save(assignment);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(Assignment.name, assignment.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

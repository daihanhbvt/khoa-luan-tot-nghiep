import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clean } from './entities/clean.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResClean } from './../clean/models/res.clean.model';
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
import { ReqClean } from './models/req.clean.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { CheckList } from 'src/check-list/entities/check-list.entity';
@Injectable()
export class CleanService {
  constructor(
    @InjectRepository(Clean)
    private cleanRepository: Repository<Clean>,

    @InjectRepository(CleanStatus)
    private cleanStatusRepository: Repository<CleanStatus>,

    @InjectRepository(CheckStatus)
    private checkStatusRepository: Repository<CheckStatus>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.cleanRepository.findAndCount({
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
        data: Mapper.map(ResClean, rows[0]),
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
      const clean = await this.cleanRepository.findOne({
        relations:['CheckList','Comments'],
        where:{
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      }});
      if (!clean) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
      }
      return Mapper.map(ResClean, clean);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqClean): Promise<Clean | Problem> {
    // [1] validate data
    const validMessages = ReqClean.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check clean_status_id
    let cleanStatus: CleanStatus;
    try {
      cleanStatus = await this.cleanStatusRepository.findOne({
        Id: body.clean_status_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    // check check_status_id
    let checkStatus: CheckStatus;
    try {
      checkStatus = await this.checkStatusRepository.findOne({
        Id: body.check_status_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    //  check assignmentid
    let assignment: Assignment;
    try {
      assignment = await this.assignmentRepository.findOne({
        Id: body.assignment_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!assignment) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Assignment.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }
    try {
      const clean = new Clean();
      clean.Name = body.name;
      clean.Description = body.description;
      clean.CleanStatus = cleanStatus;
      clean.CheckStatus = checkStatus;
      clean.Assignment = assignment;
      clean.setBaseDataInfo(req);

      await this.cleanRepository.save(clean);
      return Mapper.map(ResClean, clean);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqClean,
  ): Promise<Clean | Problem> {
    // [1] validate data
    const validMessages = ReqClean.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let clean;
    try {
      clean = await this.cleanRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!clean) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // check clean_status_id
    let cleanStatus: CleanStatus;
    if (body.clean_status_id && clean.CleanStatusId !== body.clean_status_id) {
      let cleanStatus: CleanStatus;
      try {
        cleanStatus = await this.cleanStatusRepository.findOne({
          Id: body.clean_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!cleanStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    let checkStatus: CheckStatus;
    if (body.check_status_id && clean.CheckStatusId !== body.check_status_id) {
      // check clean_status_id
      let checkStatus: CheckStatus;
      try {
        checkStatus = await this.checkStatusRepository.findOne({
          Id: body.check_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    let assignment: Assignment;
    if (body.assignment_id && clean.AssignmentId !== body.assignment_id) {
      // check clean_status_id
      let assignment: Assignment;
      try {
        assignment = await this.assignmentRepository.findOne({
          Id: body.assignment_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!assignment) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Assignment.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      clean.Name = body.name || clean.Name;
      clean.Description = body.description || clean.Description;
      clean.CleanStatusId = cleanStatus?.Id || clean.CleanStatusId;
      clean.CheckStatusId = checkStatus?.Id || clean.CheckStatusId;
      clean.AssignmentId = assignment?.Id || clean.AssignmentId;
      clean.setBaseDataInfo(req);

      await this.cleanRepository.save(clean);
      return Mapper.map(ResClean, clean);
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
    // Get clean by id from db
    let clean;
    try {
      clean = await this.cleanRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!clean) {
        return Problem.NotFound(clean.MSG_OBJ_NOT_FOUND(Clean.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      clean.DeleteFlag = DeleteFlag.Yes;
      await this.cleanRepository.save(clean);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Clean.name, clean.Id));
    } catch (error) {
      return error;
    }
  }
}

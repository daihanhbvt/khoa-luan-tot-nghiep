import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicArea } from './entities/public-area.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResPublicArea } from './models/res.public-area.model';
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
import { ReqPublicArea } from './models/req.public-area.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { Floors } from 'src/floors/entities/floors.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { RequestTarget as request } from 'src/common';

@Injectable()
export class PublicAreaService {
  constructor(
    @InjectRepository(PublicArea)
    private publicAreaRepository: Repository<PublicArea>,

    @InjectRepository(CleanStatus)
    private cleanStatusRepository: Repository<CleanStatus>,

    @InjectRepository(CheckStatus)
    private checkStatusRepository: Repository<CheckStatus>,

    @InjectRepository(Floors)
    private floorsRepository: Repository<Floors>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const floorsId = req.query.floors_id;
      const rows: any = await this.publicAreaRepository.findAndCount({
        relations: [
          'Assignments',
          CheckStatus.name,
          CleanStatus.name,
          Floors.name,
        ],
        where: {
          DeleteFlag: DeleteFlag.None,
          SiteId: req.body.site_id,
          FloorsId: Like(`%${floorsId || ''}%`),
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
      let assignments: Assignment[] = [];
      rows[0].map(r => {
        if (r.Assignments &&
          r.Assignments.length > 0) {
          assignments = assignments.concat(r.Assignments);
        }
      });

      let employeeIds = assignments.map(a => a.EmployeeId) || [];
      let supervisorIds = assignments.map(a => a.SupervisorId) || [];
      let userIds = employeeIds.concat(supervisorIds);
      // get users by ids
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
            rows[0].map(r => {
              r.Assignments.map(a => {
                a.Employee = users.find(u => u.id === a.EmployeeId);
                a.Supervisor = users.find(u => u.id === a.SupervisorId);
              });
            });
          }
        } catch (error) { }
      }
      return {
        data: Mapper.map(ResPublicArea, rows[0]),
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
      const publicArea = await this.publicAreaRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!publicArea) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(PublicArea.name));
      }
      return Mapper.map(ResPublicArea, publicArea);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqPublicArea,
  ): Promise<PublicArea | Problem> {
    // [1] validate data
    const validMessages = ReqPublicArea.runValidator(body);
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

    // check floors id
    let floors: Floors;
    try {
      floors = await this.floorsRepository.findOne({
        Id: body.floors_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!floors) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }
    try {
      const publicArea = new PublicArea();
      publicArea.Name = body.name;
      publicArea.Description = body.description;
      publicArea.CleanStatus = cleanStatus;
      publicArea.CheckStatus = checkStatus;
      publicArea.Floors = floors;
      publicArea.setBaseDataInfo(req);

      await this.publicAreaRepository.save(publicArea);
      return Mapper.map(ResPublicArea, publicArea);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqPublicArea,
  ): Promise<PublicArea | Problem> {
    // [1] validate data
    const validMessages = ReqPublicArea.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let publicArea;
    try {
      publicArea = await this.publicAreaRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!publicArea) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(PublicArea.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let cleanStatus: CleanStatus;
    if (
      body.clean_status_id &&
      publicArea.CleanStatusId !== body.clean_status_id
    ) {
      // check clean_status_id
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
    if (
      body.check_status_id &&
      publicArea.CheckStatusId !== body.check_status_id
    ) {
      // check clean_status_id

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

    let floors: Floors;
    if (body.floors_id && publicArea.FloorsId !== body.floors_id) {
      // check floors id

      try {
        floors = await this.floorsRepository.findOne({
          Id: body.floors_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!floors) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // Update value
    try {
      publicArea.Name = body.name || publicArea.Name;
      publicArea.Description = body.description || publicArea.Description;
      publicArea.CleanStatusId = cleanStatus?.Id || publicArea.CleanStatusId;
      publicArea.CheckStatusId = checkStatus?.Id || publicArea.CheckStatusId;
      publicArea.FloorsId = floors?.Id || publicArea.FloorsId;
      publicArea.setBaseDataInfo(req);

      await this.publicAreaRepository.save(publicArea);
      return Mapper.map(ResPublicArea, publicArea);
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
    // Get publicArea by id from db
    let publicArea;
    try {
      publicArea = await this.publicAreaRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!publicArea) {
        return Problem.NotFound(publicArea.MSG_OBJ_NOT_FOUND(PublicArea.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      publicArea.DeleteFlag = DeleteFlag.Yes;
      await this.publicAreaRepository.save(publicArea);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(PublicArea.name, publicArea.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

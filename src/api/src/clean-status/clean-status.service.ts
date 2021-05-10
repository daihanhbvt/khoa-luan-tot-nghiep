import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CleanStatus } from './entities/clean-status.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCleanStatus } from './models/res.clean-status.model';
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
import { ReqCleanStatus } from './models/req.clean-status.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CleanStatusService {
  constructor(
    @InjectRepository(CleanStatus)
    private cleanStatusRepository: Repository<CleanStatus>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.cleanStatusRepository.findAndCount({
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
        data: Mapper.map(ResCleanStatus, rows[0]),
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
      const cleanStatus = await this.cleanStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
      }
      return Mapper.map(ResCleanStatus, cleanStatus);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCleanStatus,
  ): Promise<CleanStatus | Problem> {
    // [1] validate data
    const validMessages = ReqCleanStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const cleanStatus = new CleanStatus();
      cleanStatus.Name = body.name;
      cleanStatus.Color = body.color;
      cleanStatus.DisplayIndex = body.display_index;
      cleanStatus.Description = body.description;
      cleanStatus.IsDefault = body.is_default || false;
      cleanStatus.setBaseDataInfo(req);

      await this.cleanStatusRepository.save(cleanStatus);
      return Mapper.map(ResCleanStatus, cleanStatus);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCleanStatus,
  ): Promise<CleanStatus | Problem> {
    // [1] validate data
    const validMessages = ReqCleanStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let cleanStatus;
    try {
      cleanStatus = await this.cleanStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      cleanStatus.Name = body.name || cleanStatus.Name;
      cleanStatus.Color = body.color || cleanStatus.Color;
      cleanStatus.DisplayIndex = body.display_index || cleanStatus.DisplayIndex;
      cleanStatus.Description = body.description || cleanStatus.Description;
      cleanStatus.IsDefault = body.is_default || cleanStatus.IsDefault;
      cleanStatus.setBaseDataInfo(req);

      await this.cleanStatusRepository.save(cleanStatus);
      return Mapper.map(ResCleanStatus, cleanStatus);
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
    // Get cleanStatus by id from db
    let cleanStatus;
    try {
      cleanStatus = await this.cleanStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatus) {
        return Problem.NotFound(
          cleanStatus.MSG_OBJ_NOT_FOUND(CleanStatus.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      cleanStatus.DeleteFlag = DeleteFlag.Yes;
      await this.cleanStatusRepository.save(cleanStatus);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(CleanStatus.name, cleanStatus.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

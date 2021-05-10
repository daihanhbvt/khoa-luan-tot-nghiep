import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckStatus } from './entities/check-status.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckStatus } from './models/res.check-status.model';
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
import { ReqCheckStatus } from './models/req.check-status.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CheckStatusService {
  constructor(
    @InjectRepository(CheckStatus)
    private checkStatusRepository: Repository<CheckStatus>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkStatusRepository.findAndCount({
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
        data: Mapper.map(ResCheckStatus, rows[0]),
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
      const checkStatus = await this.checkStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
      }
      return Mapper.map(ResCheckStatus, checkStatus);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckStatus,
  ): Promise<CheckStatus | Problem> {
    // [1] validate data
    const validMessages = ReqCheckStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const checkStatus = new CheckStatus();
      checkStatus.Name = body.name;
      checkStatus.Color = body.color;
      checkStatus.Description = body.description;
      checkStatus.DisplayIndex = body.display_index;
      checkStatus.IsDefault = body.is_default || false;
      checkStatus.setBaseDataInfo(req);

      await this.checkStatusRepository.save(checkStatus);
      return Mapper.map(ResCheckStatus, checkStatus);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckStatus,
  ): Promise<CheckStatus | Problem> {
    // [1] validate data
    const validMessages = ReqCheckStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkStatus;
    try {
      checkStatus = await this.checkStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      checkStatus.Name = body.name || checkStatus.Name;
      checkStatus.Color = body.color || checkStatus.Color;
      checkStatus.Description = body.description || checkStatus.Description;
      checkStatus.DisplayIndex = body.display_index || checkStatus.DisplayIndex;
      checkStatus.IsDefault = body.is_default || checkStatus.IsDefault;
      checkStatus.setBaseDataInfo(req);

      await this.checkStatusRepository.save(checkStatus);
      return Mapper.map(ResCheckStatus, checkStatus);
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
    // Get checkStatus by id from db
    let checkStatus;
    try {
      checkStatus = await this.checkStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatus) {
        return Problem.NotFound(
          checkStatus.MSG_OBJ_NOT_FOUND(CheckStatus.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkStatus.DeleteFlag = DeleteFlag.Yes;
      await this.checkStatusRepository.save(checkStatus);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(CheckStatus.name, checkStatus.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkFlow } from './entities/work-flow.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { IPagination } from 'src/base-model/pagination-result';
import { Mapper } from 'src/common/mapper';
import {GetAllAction,Problem,GetAction,UpdateAction,CreateAction,DeleteAction,} from 'src/common';

import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { ResWorkFlow } from './models/res.work-flow.model';
import { ReqWorkFlow } from './models/req.work-flow.model';
@Injectable()
export class WorkFlowService {
  constructor(
    @InjectRepository(WorkFlow)
    private workFlowRepository: Repository<WorkFlow>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.workFlowRepository.findAndCount({
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
        data: Mapper.map(ResWorkFlow, rows[0]),
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
      const workFlow = await this.workFlowRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!workFlow) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(WorkFlow.name));
      }
      return Mapper.map(ResWorkFlow, workFlow);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqWorkFlow,
  ): Promise<WorkFlow | Problem> {
    // [1] validate data
    const validMessages = ReqWorkFlow.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }


    try {
      const workFlow = new WorkFlow();

      workFlow.setBaseDataInfo(req);

      await this.workFlowRepository.save(workFlow);
      return Mapper.map(ResWorkFlow, workFlow);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(req: Request,id: string,body: ReqWorkFlow,): Promise<WorkFlow | Problem> {
    // [1] validate data
    const validMessages = ReqWorkFlow.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let workFlow;
    try {
      workFlow = await this.workFlowRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!workFlow) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(WorkFlow.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }


    // Update value
    try {

      workFlow.setBaseDataInfo(req);

      await this.workFlowRepository.save(workFlow);
      return Mapper.map(ResWorkFlow, workFlow);
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
    // Get workFlow by id from db
    let workFlow;
    try {
      workFlow = await this.workFlowRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!workFlow) {
        return Problem.NotFound(workFlow.MSG_OBJ_NOT_FOUND(WorkFlow.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      workFlow.DeleteFlag = DeleteFlag.Yes;
      await this.workFlowRepository.save(workFlow);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(WorkFlow.name, workFlow.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

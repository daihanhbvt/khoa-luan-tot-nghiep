import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckStatusTemplate } from './entities/check-status-template.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckStatusTemplate } from './models/res.check-status-template.model';
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
import { ReqCheckStatusTemplate } from './models/req.check-status-template.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CheckStatusTemplateService {
  constructor(
    @InjectRepository(CheckStatusTemplate)
    private checkStatusTemplateRepository: Repository<CheckStatusTemplate>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkStatusTemplateRepository.findAndCount({
        where: {
          DeleteFlag: DeleteFlag.None,
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
        data: Mapper.map(ResCheckStatusTemplate, rows[0]),
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
      const checkStatusTemplate = await this.checkStatusTemplateRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckStatusTemplate.name),
        );
      }
      return Mapper.map(ResCheckStatusTemplate, checkStatusTemplate);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckStatusTemplate,
  ): Promise<CheckStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCheckStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const checkStatusTemplate = new CheckStatusTemplate();
      checkStatusTemplate.Name = body.name;
      checkStatusTemplate.Color = body.color;
      checkStatusTemplate.Description = body.description;
      checkStatusTemplate.IsDefault = body.is_default || false;
      checkStatusTemplate.setBaseDataInfo(req);

      await this.checkStatusTemplateRepository.save(checkStatusTemplate);
      return Mapper.map(ResCheckStatusTemplate, checkStatusTemplate);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckStatusTemplate,
  ): Promise<CheckStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCheckStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkStatusTemplate;
    try {
      checkStatusTemplate = await this.checkStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      checkStatusTemplate.Name = body.name || checkStatusTemplate.Name;
      checkStatusTemplate.Color = body.color || checkStatusTemplate.Color;
      checkStatusTemplate.Description =body.description || checkStatusTemplate.Description;
      checkStatusTemplate.IsDefault = body.is_default || checkStatusTemplate.IsDefault;
      checkStatusTemplate.setBaseDataInfo(req);

      await this.checkStatusTemplateRepository.save(checkStatusTemplate);
      return Mapper.map(ResCheckStatusTemplate, checkStatusTemplate);
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
    // Get checkStatusTemplate by id from db
    let checkStatusTemplate;
    try {
      checkStatusTemplate = await this.checkStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkStatusTemplate) {
        return Problem.NotFound(
          checkStatusTemplate.MSG_OBJ_NOT_FOUND(CheckStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkStatusTemplate.DeleteFlag = DeleteFlag.Yes;
      await this.checkStatusTemplateRepository.save(checkStatusTemplate);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckStatusTemplate.name,
          checkStatusTemplate.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

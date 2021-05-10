import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CleanStatusTemplate } from './entities/clean-status-template.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCleanStatusTemplate } from './models/res.clean-status-template.model';
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
import { ReqCleanStatusTemplate } from './models/req.clean-status-template.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CleanStatusTemplateService {
  constructor(
    @InjectRepository(CleanStatusTemplate)
    private cleanStatusTemplateRepository: Repository<CleanStatusTemplate>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.cleanStatusTemplateRepository.findAndCount({
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
        data: Mapper.map(ResCleanStatusTemplate, rows[0]),
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
      const cleanStatusTemplate = await this.cleanStatusTemplateRepository.findOne(
        {
          Id: id,
          DeleteFlag: DeleteFlag.None,
        },
      );
      if (!cleanStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CleanStatusTemplate.name),
        );
      }
      return Mapper.map(ResCleanStatusTemplate, cleanStatusTemplate);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCleanStatusTemplate,
  ): Promise<CleanStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCleanStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const cleanStatusTemplate = new CleanStatusTemplate();
      cleanStatusTemplate.Name = body.name;
      cleanStatusTemplate.Color = body.color;
      cleanStatusTemplate.Description = body.description;
      cleanStatusTemplate.IsDefault = body.is_default;
      cleanStatusTemplate.setBaseDataInfo(req);

      await this.cleanStatusTemplateRepository.save(cleanStatusTemplate);
      return Mapper.map(ResCleanStatusTemplate, cleanStatusTemplate);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCleanStatusTemplate,
  ): Promise<CleanStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCleanStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let cleanStatusTemplate;
    try {
      cleanStatusTemplate = await this.cleanStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CleanStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      cleanStatusTemplate.Name = body.name || cleanStatusTemplate.Name;
      cleanStatusTemplate.Color = body.color || cleanStatusTemplate.Color;
      cleanStatusTemplate.Description =body.description || cleanStatusTemplate.Description;
      cleanStatusTemplate.IsDefault =body.is_default || cleanStatusTemplate.IsDefault;
      cleanStatusTemplate.setBaseDataInfo(req);

      await this.cleanStatusTemplateRepository.save(cleanStatusTemplate);
      return Mapper.map(ResCleanStatusTemplate, cleanStatusTemplate);
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
    // Get cleanStatusTemplate by id from db
    let cleanStatusTemplate;
    try {
      cleanStatusTemplate = await this.cleanStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!cleanStatusTemplate) {
        return Problem.NotFound(
          cleanStatusTemplate.MSG_OBJ_NOT_FOUND(CleanStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      cleanStatusTemplate.DeleteFlag = DeleteFlag.Yes;
      await this.cleanStatusTemplateRepository.save(cleanStatusTemplate);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CleanStatusTemplate.name,
          cleanStatusTemplate.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

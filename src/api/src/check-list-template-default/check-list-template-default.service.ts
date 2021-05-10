import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListTemplateDefault } from './entities/check-list-template-default.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListTemplateDefault } from './models/res.check-list-template-default.model';
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
import { ReqCheckListTemplateDefault } from './models/req.check-list-template-default.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CheckListTemplateDefaultService {
  constructor(
    @InjectRepository(CheckListTemplateDefault)
    private checkListTemplateDefaultRepository: Repository<
      CheckListTemplateDefault
    >,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListTemplateDefaultRepository.findAndCount({
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
        data: Mapper.map(ResCheckListTemplateDefault, rows[0]),
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
      const checkListTemplateDefault = await this.checkListTemplateDefaultRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefault) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefault.name),
        );
      }
      return Mapper.map(ResCheckListTemplateDefault, checkListTemplateDefault);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListTemplateDefault,
  ): Promise<CheckListTemplateDefault | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateDefault.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const checkListTemplateDefault = new CheckListTemplateDefault();
      checkListTemplateDefault.Name = body.name;
      checkListTemplateDefault.Description = body.description;
      checkListTemplateDefault.IsDefault = body.is_default || false;
      checkListTemplateDefault.setBaseDataInfo(req);

      await this.checkListTemplateDefaultRepository.save(
        checkListTemplateDefault,
      );
      return Mapper.map(ResCheckListTemplateDefault, checkListTemplateDefault);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListTemplateDefault,
  ): Promise<CheckListTemplateDefault | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateDefault.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListTemplateDefault;
    try {
      checkListTemplateDefault = await this.checkListTemplateDefaultRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefault) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefault.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      checkListTemplateDefault.Name =
        body.name || checkListTemplateDefault.Name;
      checkListTemplateDefault.Description =
        body.description || checkListTemplateDefault.Description;
      checkListTemplateDefault.IsDefault =
        body.is_default || checkListTemplateDefault.IsDefault;
      checkListTemplateDefault.setBaseDataInfo(req);

      await this.checkListTemplateDefaultRepository.save(
        checkListTemplateDefault,
      );
      return Mapper.map(ResCheckListTemplateDefault, checkListTemplateDefault);
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
    // Get checkListTemplateDefault by id from db
    let checkListTemplateDefault;
    try {
      checkListTemplateDefault = await this.checkListTemplateDefaultRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefault) {
        return Problem.NotFound(
          checkListTemplateDefault.MSG_OBJ_NOT_FOUND(
            CheckListTemplateDefault.name,
          ),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListTemplateDefault.DeleteFlag = DeleteFlag.Yes;
      await this.checkListTemplateDefaultRepository.save(
        checkListTemplateDefault,
      );
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckListTemplateDefault.name,
          checkListTemplateDefault.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListTemplateDefaultItem } from './entities/check-list-template-default-item.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListTemplateDefaultItem } from './models/res.check-list-template-default-item.model';
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
import { ReqCheckListTemplateDefaultItem } from './models/req.check-list-template-default-item.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CheckListTemplateDefault } from 'src/check-list-template-default/entities/check-list-template-default.entity';
@Injectable()
export class CheckListTemplateDefaultItemService {
  constructor(
    @InjectRepository(CheckListTemplateDefaultItem)
    private checkListTemplateDefaultItemRepository: Repository<
      CheckListTemplateDefaultItem
    >,

    @InjectRepository(CheckListTemplateDefault)
    private checkListTemplateDefaultRepository: Repository<
      CheckListTemplateDefault
    >,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListTemplateDefaultItemRepository.findAndCount(
        {
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
        },
      );

      return {
        data: Mapper.map(ResCheckListTemplateDefaultItem, rows[0]),
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
      const checkListTemplateDefaultItem = await this.checkListTemplateDefaultItemRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefaultItem) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefaultItem.name),
        );
      }
      return Mapper.map(
        ResCheckListTemplateDefaultItem,
        checkListTemplateDefaultItem,
      );
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListTemplateDefaultItem,
  ): Promise<CheckListTemplateDefaultItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateDefaultItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    //  checklisttemplatedefaultid
    let checkListTemplateDefault: CheckListTemplateDefault;
    try {
      checkListTemplateDefault = await this.checkListTemplateDefaultRepository.findOne(
        {
          Id: body.check_list_template_default_id,
          DeleteFlag: DeleteFlag.None,
        },
      );
      if (!checkListTemplateDefault) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefault.name),
        );
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const checkListTemplateDefaultItem = new CheckListTemplateDefaultItem();
      checkListTemplateDefaultItem.Name = body.name;
      checkListTemplateDefaultItem.Description = body.description;
      checkListTemplateDefaultItem.CheckListTemplateDefault = checkListTemplateDefault;
      checkListTemplateDefaultItem.IsDefault = body.is_default || false;
      checkListTemplateDefaultItem.setBaseDataInfo(req);

      await this.checkListTemplateDefaultItemRepository.save(
        checkListTemplateDefaultItem,
      );
      return Mapper.map(
        ResCheckListTemplateDefaultItem,
        checkListTemplateDefaultItem,
      );
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListTemplateDefaultItem,
  ): Promise<CheckListTemplateDefaultItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateDefaultItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListTemplateDefaultItem;
    try {
      checkListTemplateDefaultItem = await this.checkListTemplateDefaultItemRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefaultItem) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefaultItem.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let checkListTemplateDefault: CheckListTemplateDefault;
    if (
      body.check_list_template_default_id &&
      checkListTemplateDefaultItem.CheckListTemplateDefaultId !==
        body.check_list_template_default_id
    ) {
      // check checkListTemplate id
      let checkListTemplateDefault: CheckListTemplateDefault;
      try {
        checkListTemplateDefault = await this.checkListTemplateDefaultRepository.findOne(
          {
            Id: body.check_list_template_default_id,
            DeleteFlag: DeleteFlag.None,
          },
        );
        if (!checkListTemplateDefault) {
          return Problem.NotFound(
            Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateDefault.name),
          );
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      checkListTemplateDefaultItem.Name =
        body.name || checkListTemplateDefaultItem.Name;
      checkListTemplateDefaultItem.Description =
        body.description || checkListTemplateDefaultItem.Description;
      checkListTemplateDefaultItem.IsDefault =
        body.is_default || checkListTemplateDefaultItem.IsDefault;
      checkListTemplateDefaultItem.CheckListTemplateDefaultId =
        checkListTemplateDefault?.Id ||
        checkListTemplateDefaultItem.CheckListTemplateDefaultId;
      checkListTemplateDefaultItem.setBaseDataInfo(req);

      await this.checkListTemplateDefaultItemRepository.save(
        checkListTemplateDefaultItem,
      );
      return Mapper.map(
        ResCheckListTemplateDefaultItem,
        checkListTemplateDefaultItem,
      );
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
    // Get checkListTemplateDefaultItem by id from db
    let checkListTemplateDefaultItem;
    try {
      checkListTemplateDefaultItem = await this.checkListTemplateDefaultItemRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateDefaultItem) {
        return Problem.NotFound(
          checkListTemplateDefaultItem.MSG_OBJ_NOT_FOUND(
            CheckListTemplateDefaultItem.name,
          ),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListTemplateDefaultItem.DeleteFlag = DeleteFlag.Yes;
      await this.checkListTemplateDefaultItemRepository.save(
        checkListTemplateDefaultItem,
      );
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckListTemplateDefaultItem.name,
          checkListTemplateDefaultItem.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

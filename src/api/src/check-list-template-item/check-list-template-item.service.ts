import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListTemplateItem } from './entities/check-list-template-item.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListTemplateItem } from './models/res.check-list-template-item.model';
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
import { ReqCheckListTemplateItem } from './models/req.check-list-template-item.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
@Injectable()
export class CheckListTemplateItemService {
  constructor(
    @InjectRepository(CheckListTemplateItem)
    private checkListTemplateItemRepository: Repository<CheckListTemplateItem>,

    @InjectRepository(CheckListTemplate)
    private checkListTemplateRepository: Repository<CheckListTemplate>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListTemplateItemRepository.findAndCount({
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
        data: Mapper.map(ResCheckListTemplateItem, rows[0]),
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
      const checkListTemplateItem = await this.checkListTemplateItemRepository.findOne(
        { Id: id, SiteId: req.body.site_id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateItem) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateItem.name),
        );
      }
      return Mapper.map(ResCheckListTemplateItem, checkListTemplateItem);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListTemplateItem,
  ): Promise<CheckListTemplateItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    //  checklisttemplate id
    let checkListTemplate: CheckListTemplate;
    try {
      checkListTemplate = await this.checkListTemplateRepository.findOne({
        Id: body.check_list_template_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name),
        );
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const checkListTemplateItem = new CheckListTemplateItem();
      checkListTemplateItem.Name = body.name;
      checkListTemplateItem.Description = body.description;
      checkListTemplateItem.CheckListTemplate = checkListTemplate;
      checkListTemplateItem.setBaseDataInfo(req);

      await this.checkListTemplateItemRepository.save(checkListTemplateItem);
      return Mapper.map(ResCheckListTemplateItem, checkListTemplateItem);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListTemplateItem,
  ): Promise<CheckListTemplateItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplateItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListTemplateItem;
    try {
      checkListTemplateItem = await this.checkListTemplateItemRepository.findOne(
        { Id: id, SiteId: req.body.site_id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateItem) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplateItem.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let checkListTemplate: CheckListTemplate;
    if (
      body.check_list_template_id &&
      checkListTemplateItem.CheckListTemplateId !== body.check_list_template_id
    ) {
      // check checkListTemplate id
      let checkListTemplate: CheckListTemplate;
      try {
        checkListTemplate = await this.checkListTemplateRepository.findOne({
          Id: body.check_list_template_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkListTemplate) {
          return Problem.NotFound(
            Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name),
          );
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      checkListTemplateItem.Name = body.name || checkListTemplateItem.Name;
      checkListTemplateItem.Description =
        body.description || checkListTemplateItem.Description;
      checkListTemplateItem.CheckListTemplateId =
        checkListTemplate?.Id || checkListTemplateItem.CheckListTemplateId;
      checkListTemplateItem.setBaseDataInfo(req);

      await this.checkListTemplateItemRepository.save(checkListTemplateItem);
      return Mapper.map(ResCheckListTemplateItem, checkListTemplateItem);
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
    // Get checkListTemplateItem by id from db
    let checkListTemplateItem;
    try {
      checkListTemplateItem = await this.checkListTemplateItemRepository.findOne(
        { Id: id, SiteId: req.body.site_id, DeleteFlag: DeleteFlag.None },
      );
      if (!checkListTemplateItem) {
        return Problem.NotFound(
          checkListTemplateItem.MSG_OBJ_NOT_FOUND(CheckListTemplateItem.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListTemplateItem.DeleteFlag = DeleteFlag.Yes;
      await this.checkListTemplateItemRepository.save(checkListTemplateItem);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckListTemplateItem.name,
          checkListTemplateItem.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

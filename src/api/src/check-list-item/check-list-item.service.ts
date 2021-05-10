import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListItem } from './entities/check-list-item.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListItem } from './models/res.check-list-item.model';
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
import { ReqCheckListItem } from './models/req.check-list-item.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CheckList } from 'src/check-list/entities/check-list.entity';
@Injectable()
export class CheckListItemService {
  constructor(
    @InjectRepository(CheckListItem)
    private checkListItemRepository: Repository<CheckListItem>,

    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListItemRepository.findAndCount({
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
        data: Mapper.map(ResCheckListItem, rows[0]),
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
      const checkListItem = await this.checkListItemRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListItem) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListItem.name));
      }
      return Mapper.map(ResCheckListItem, checkListItem);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListItem,
  ): Promise<CheckListItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check lis id
    let checkList: CheckList;
    try {
      checkList = await this.checkListRepository.findOne({
        Id: body.check_list_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkList) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckList.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const checkListItem = new CheckListItem();
      checkListItem.Name = body.name;
      checkListItem.Description = body.description;
      checkListItem.CheckList = checkList;
      checkListItem.setBaseDataInfo(req);

      await this.checkListItemRepository.save(checkListItem);
      return Mapper.map(ResCheckListItem, checkListItem);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListItem,
  ): Promise<CheckListItem | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListItem.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListItem;
    try {
      checkListItem = await this.checkListItemRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListItem) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListItem.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let checkList: CheckList;
    if (
      body.check_list_id &&
      checkListItem.CheckListId !== body.check_list_id
    ) {
      try {
        checkList = await this.checkListRepository.findOne({
          Id: body.check_list_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkList) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckList.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      checkListItem.Name = body.name || checkListItem.Name;
      checkListItem.Description = body.description || checkListItem.Description;
      checkListItem.CheckListId = checkList?.Id || checkListItem.CheckListId;
      checkListItem.setBaseDataInfo(req);

      await this.checkListItemRepository.save(checkListItem);
      return Mapper.map(ResCheckListItem, checkListItem);
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
    // Get checkListItem by id from db
    let checkListItem;
    try {
      checkListItem = await this.checkListItemRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListItem) {
        return Problem.NotFound(
          checkListItem.MSG_OBJ_NOT_FOUND(CheckListItem.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListItem.DeleteFlag = DeleteFlag.Yes;
      await this.checkListItemRepository.save(checkListItem);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(CheckListItem.name, checkListItem.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

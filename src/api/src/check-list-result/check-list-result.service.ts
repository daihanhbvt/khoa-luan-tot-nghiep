import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListResult } from './entities/check-list-result.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListResult } from './models/res.check-list-result.model';
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
import { ReqCheckListResult } from './models/req.check-list-result.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListItem } from 'src/check-list-item/entities/check-list-item.entity';
@Injectable()
export class CheckListResultService {
  constructor(
    @InjectRepository(CheckListResult)
    private checkListResultRepository: Repository<CheckListResult>,

    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,

    @InjectRepository(CheckListItem)
    private checkListItemRepository: Repository<CheckListItem>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListResultRepository.findAndCount({
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
        data: Mapper.map(ResCheckListResult, rows[0]),
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
      const checkListResult = await this.checkListResultRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListResult) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListResult.name));
      }
      return Mapper.map(ResCheckListResult, checkListResult);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListResult,
  ): Promise<CheckListResult | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListResult.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check list id
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

    // checklistitem id
    let checkListItem: CheckListItem;
    try {
      checkListItem = await this.checkListItemRepository.findOne({
        Id: body.check_list_item_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListItem) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListItem.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const checkListResult = new CheckListResult();
      checkListResult.Name = body.name;
      checkListResult.Description = body.description;
      checkListResult.CheckList = checkList;
      checkListResult.CheckListItem = checkListItem;
      checkListResult.setBaseDataInfo(req);

      await this.checkListResultRepository.save(checkListResult);
      return Mapper.map(ResCheckListResult, checkListResult);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListResult,
  ): Promise<CheckListResult | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListResult.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListResult;
    try {
      checkListResult = await this.checkListResultRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListResult) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListResult.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let checkList: CheckList;
    if (
      body.check_list_id &&
      checkListResult.CheckListId !== body.check_list_id
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

    let checkListItem: CheckListItem;
    if (
      body.check_list_item_id &&
      checkListResult.CheckListItemId !== body.check_list_item_id
    ) {
      // check checkList id
      let checkListItem: CheckListItem;
      try {
        checkListItem = await this.checkListItemRepository.findOne({
          Id: body.check_list_item_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkListItem) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckListItem.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // Update value
    try {
      checkListResult.Name = body.name || checkListResult.Name;
      checkListResult.Description =
        body.description || checkListResult.Description;
      checkListResult.CheckListId =
        checkList?.Id || checkListResult.CheckListId;
      checkListResult.CheckListItemId =
        checkListItem?.Id || checkListResult.CheckListItemId;
      checkListResult.setBaseDataInfo(req);

      await this.checkListResultRepository.save(checkListResult);
      return Mapper.map(ResCheckListResult, checkListResult);
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
    // Get checkListResult by id from db
    let checkListResult;
    try {
      checkListResult = await this.checkListResultRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListResult) {
        return Problem.NotFound(
          checkListResult.MSG_OBJ_NOT_FOUND(CheckListResult.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListResult.DeleteFlag = DeleteFlag.Yes;
      await this.checkListResultRepository.save(checkListResult);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckListResult.name,
          checkListResult.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

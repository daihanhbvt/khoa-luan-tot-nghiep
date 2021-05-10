import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckList } from './entities/check-list.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckList } from './models/res.check-list.model';
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
import { ReqCheckList } from './models/req.check-list.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { Clean } from 'src/clean/entities/clean.entity';
@Injectable()
export class CheckListService {
  constructor(
    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,

    @InjectRepository(CheckListTemplate)
    private checkListTemplateRepository: Repository<CheckListTemplate>,

    @InjectRepository(Clean)
    private cleanRepository: Repository<Clean>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListRepository.findAndCount({
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
        data: Mapper.map(ResCheckList, rows[0]),
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
      const checkList = await this.checkListRepository.findOne({
        relations: ['CheckListItem'],
        where: {
          Id: id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        },
      });
      if (!checkList) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckList.name));
      }
      return Mapper.map(ResCheckList, checkList);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqCheckList): Promise<CheckList | Problem> {
    // [1] validate data
    const validMessages = ReqCheckList.runValidator(body);
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

    //  clean id
    let clean: Clean;
    try {
      clean = await this.cleanRepository.findOne({
        Id: body.clean_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!clean) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const checkList = new CheckList();
      checkList.Name = body.name;
      checkList.Description = body.description;
      checkList.DisplayIndex = body.display_index;
      checkList.CheckListTemplate = checkListTemplate;
      checkList.Clean = clean;
      checkList.setBaseDataInfo(req);

      await this.checkListRepository.save(checkList);
      return Mapper.map(ResCheckList, checkList);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckList,
  ): Promise<CheckList | Problem> {
    // [1] validate data
    const validMessages = ReqCheckList.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkList;
    try {
      checkList = await this.checkListRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkList) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckList.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let checkListTemplate: CheckListTemplate;
    if (
      body.check_list_template_id &&
      checkList.CheckListTemplateId !== body.check_list_template_id
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

    // clean
    let clean: Clean;
    if (body.clean_id && checkList.CleanId !== body.clean_id) {
      try {
        clean = await this.cleanRepository.findOne({
          Id: body.clean_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!clean) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      checkList.Name = body.name || checkList.Name;
      checkList.DisplayIndex = body.display_index || checkList.DisplayIndex;
      checkList.Description = body.description || checkList.Description;
      checkList.CheckListTemplateId =checkListTemplate?.Id || checkList.CheckListTemplateId;
      checkList.CleanId = clean?.Id || checkList.CleanId;
      checkList.setBaseDataInfo(req);

      await this.checkListRepository.save(checkList);
      return Mapper.map(ResCheckList, checkList);
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
    // Get checkList by id from db
    let checkList;
    try {
      checkList = await this.checkListRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkList) {
        return Problem.NotFound(checkList.MSG_OBJ_NOT_FOUND(CheckList.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkList.DeleteFlag = DeleteFlag.Yes;
      await this.checkListRepository.save(checkList);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(CheckList.name, checkList.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

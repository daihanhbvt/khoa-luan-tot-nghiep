import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TableProperties } from './entities/table-properties.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResTableProperties } from './../table-properties/models/res.table-properties.model';
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
import { ReqTableProperties } from './models/req.table-properties.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class TablePropertiesService {
  constructor(
    @InjectRepository(TableProperties)
    private tablePropertiesRepository: Repository<TableProperties>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.tablePropertiesRepository.findAndCount({
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
        data: Mapper.map(ResTableProperties, rows[0]),
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
      const tableProperties = await this.tablePropertiesRepository.findOne({
        where: [
          {
            Id: id,
            SiteId: req.body.site_id,
            DeleteFlag: DeleteFlag.None,
          },
          {
            Name: id,
            SiteId: req.body.site_id,
            DeleteFlag: DeleteFlag.None,
          },
        ],
      });
      if (!tableProperties) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(TableProperties.name));
      }
      return Mapper.map(ResTableProperties, tableProperties);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqTableProperties,
  ): Promise<TableProperties | Problem> {
    // [1] validate data
    const validMessages = ReqTableProperties.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const tableProperties = new TableProperties();
      tableProperties.Name = body.name;
      tableProperties.Description = body.description;
      tableProperties.Data = body.data;
      tableProperties.setBaseDataInfo(req);

      await this.tablePropertiesRepository.save(tableProperties);
      return Mapper.map(ResTableProperties, tableProperties);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqTableProperties,
  ): Promise<TableProperties | Problem> {
    // [1] validate data
    const validMessages = ReqTableProperties.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let tableProperties;
    try {
      tableProperties = await this.tablePropertiesRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!tableProperties) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(TableProperties.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      tableProperties.Name = body.name || tableProperties.Name;
      tableProperties.Description =
        body.description || tableProperties.Description;
      tableProperties.Data = body.data || tableProperties.Data;
      tableProperties.setBaseDataInfo(req);

      await this.tablePropertiesRepository.save(tableProperties);
      return Mapper.map(ResTableProperties, tableProperties);
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
    // Get tableProperties by id from db
    let tableProperties;
    try {
      tableProperties = await this.tablePropertiesRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!tableProperties) {
        return Problem.NotFound(
          tableProperties.MSG_OBJ_NOT_FOUND(TableProperties.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      tableProperties.DeleteFlag = DeleteFlag.Yes;
      await this.tablePropertiesRepository.save(tableProperties);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          TableProperties.name,
          tableProperties.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

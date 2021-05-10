import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomTypeTemplate } from './entities/room-type-template.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResRoomTypeTemplate } from './models/res.room-type-template.model';
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
import { ReqRoomTypeTemplate } from './models/req.room-type-template.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class RoomTypeTemplateService {
  constructor(
    @InjectRepository(RoomTypeTemplate)
    private roomTypeTemplateRepository: Repository<RoomTypeTemplate>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.roomTypeTemplateRepository.findAndCount({
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
        data: Mapper.map(ResRoomTypeTemplate, rows[0]),
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
      const roomTypeTemplate = await this.roomTypeTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomTypeTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(RoomTypeTemplate.name),
        );
      }
      return Mapper.map(ResRoomTypeTemplate, roomTypeTemplate);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqRoomTypeTemplate,
  ): Promise<RoomTypeTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqRoomTypeTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const roomTypeTemplate = new RoomTypeTemplate();
      roomTypeTemplate.Name = body.name;
      roomTypeTemplate.Description = body.description;
      roomTypeTemplate.IsDefault = body.is_default || false;
      roomTypeTemplate.setBaseDataInfo(req);

      await this.roomTypeTemplateRepository.save(roomTypeTemplate);
      return Mapper.map(ResRoomTypeTemplate, roomTypeTemplate);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqRoomTypeTemplate,
  ): Promise<RoomTypeTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqRoomTypeTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let roomTypeTemplate;
    try {
      roomTypeTemplate = await this.roomTypeTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomTypeTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(RoomTypeTemplate.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      roomTypeTemplate.Name = body.name || roomTypeTemplate.Name;
      roomTypeTemplate.Description =
        body.description || roomTypeTemplate.Description;
      roomTypeTemplate.IsDefault =
        body.is_default || roomTypeTemplate.IsDefault;
      roomTypeTemplate.setBaseDataInfo(req);

      await this.roomTypeTemplateRepository.save(roomTypeTemplate);
      return Mapper.map(ResRoomTypeTemplate, roomTypeTemplate);
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
    // Get roomTypeTemplate by id from db
    let roomTypeTemplate;
    try {
      roomTypeTemplate = await this.roomTypeTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomTypeTemplate) {
        return Problem.NotFound(
          roomTypeTemplate.MSG_OBJ_NOT_FOUND(RoomTypeTemplate.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      roomTypeTemplate.DeleteFlag = DeleteFlag.Yes;
      await this.roomTypeTemplateRepository.save(roomTypeTemplate);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          RoomTypeTemplate.name,
          roomTypeTemplate.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

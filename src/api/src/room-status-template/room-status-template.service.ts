import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomStatusTemplate } from './entities/room-status-template.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResRoomStatusTemplate } from './models/res.room-status-template.model';
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
import { ReqRoomStatusTemplate } from './models/req.room-status-template.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class RoomStatusTemplateService {
  constructor(
    @InjectRepository(RoomStatusTemplate)
    private roomStatusTemplateRepository: Repository<RoomStatusTemplate>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.roomStatusTemplateRepository.findAndCount({
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
        data: Mapper.map(ResRoomStatusTemplate, rows[0]),
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
      const roomStatusTemplate = await this.roomStatusTemplateRepository.findOne(
        { Id: id, DeleteFlag: DeleteFlag.None },
      );
      if (!roomStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(RoomStatusTemplate.name),
        );
      }
      return Mapper.map(ResRoomStatusTemplate, roomStatusTemplate);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqRoomStatusTemplate,
  ): Promise<RoomStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqRoomStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const roomStatusTemplate = new RoomStatusTemplate();
      roomStatusTemplate.Name = body.name;
      roomStatusTemplate.Color = body.color;
      roomStatusTemplate.Description = body.description;
      roomStatusTemplate.IsDefault = body.is_default || false;
      roomStatusTemplate.setBaseDataInfo(req);

      await this.roomStatusTemplateRepository.save(roomStatusTemplate);
      return Mapper.map(ResRoomStatusTemplate, roomStatusTemplate);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqRoomStatusTemplate,
  ): Promise<RoomStatusTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqRoomStatusTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let roomStatusTemplate;
    try {
      roomStatusTemplate = await this.roomStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatusTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(RoomStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      roomStatusTemplate.Name = body.name || roomStatusTemplate.Name;
      roomStatusTemplate.Color = body.color || roomStatusTemplate.Color;
      roomStatusTemplate.Description =body.description || roomStatusTemplate.Description;
      roomStatusTemplate.IsDefault =body.is_default || roomStatusTemplate.IsDefault;
      roomStatusTemplate.setBaseDataInfo(req);

      await this.roomStatusTemplateRepository.save(roomStatusTemplate);
      return Mapper.map(ResRoomStatusTemplate, roomStatusTemplate);
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
    // Get roomStatusTemplate by id from db
    let roomStatusTemplate;
    try {
      roomStatusTemplate = await this.roomStatusTemplateRepository.findOne({
        Id: id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatusTemplate) {
        return Problem.NotFound(
          roomStatusTemplate.MSG_OBJ_NOT_FOUND(RoomStatusTemplate.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      roomStatusTemplate.DeleteFlag = DeleteFlag.Yes;
      await this.roomStatusTemplateRepository.save(roomStatusTemplate);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          RoomStatusTemplate.name,
          roomStatusTemplate.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

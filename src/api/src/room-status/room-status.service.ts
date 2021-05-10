import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room-status.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResRoomStatus } from './models/res.room-status.model';
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
import { ReqRoomStatus } from './models/req.room-status.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.roomStatusRepository.findAndCount({
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
        data: Mapper.map(ResRoomStatus, rows[0]),
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
      const roomStatus = await this.roomStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomStatus.name));
      }
      return Mapper.map(ResRoomStatus, roomStatus);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqRoomStatus,
  ): Promise<RoomStatus | Problem> {
    // [1] validate data
    const validMessages = ReqRoomStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const roomStatus = new RoomStatus();
      roomStatus.Name = body.name;
      roomStatus.Color = body.color;
      roomStatus.Description = body.description;
      roomStatus.IsDefault = body.is_default || false;
      roomStatus.setBaseDataInfo(req);

      await this.roomStatusRepository.save(roomStatus);
      return Mapper.map(ResRoomStatus, roomStatus);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqRoomStatus,
  ): Promise<RoomStatus | Problem> {
    // [1] validate data
    const validMessages = ReqRoomStatus.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let roomStatus;
    try {
      roomStatus = await this.roomStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomStatus.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      roomStatus.Name = body.name || roomStatus.Name;
      roomStatus.Color = body.color || roomStatus.Color;
      roomStatus.Description = body.description || roomStatus.Description;
      roomStatus.IsDefault = body.is_default || roomStatus.IsDefault;
      roomStatus.setBaseDataInfo(req);

      await this.roomStatusRepository.save(roomStatus);
      return Mapper.map(ResRoomStatus, roomStatus);
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
    // Get roomStatus by id from db
    let roomStatus;
    try {
      roomStatus = await this.roomStatusRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatus) {
        return Problem.NotFound(roomStatus.MSG_OBJ_NOT_FOUND(RoomStatus.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      roomStatus.DeleteFlag = DeleteFlag.Yes;
      await this.roomStatusRepository.save(roomStatus);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(RoomStatus.name, roomStatus.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

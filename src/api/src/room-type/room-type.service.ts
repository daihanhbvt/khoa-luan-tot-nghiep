import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResRoomType } from './models/res.room-type.model';
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
import { ReqRoomType } from './models/req.room-type.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.roomTypeRepository.findAndCount({
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
        data: Mapper.map(ResRoomType, rows[0]),
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
      const roomType = await this.roomTypeRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomType) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomType.name));
      }
      return Mapper.map(ResRoomType, roomType);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqRoomType): Promise<RoomType | Problem> {
    // [1] validate data
    const validMessages = ReqRoomType.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const roomType = new RoomType();
      roomType.Name = body.name;
      roomType.Description = body.description;
      roomType.IsDefault = body.is_default || false;
      roomType.setBaseDataInfo(req);

      await this.roomTypeRepository.save(roomType);
      return Mapper.map(ResRoomType, roomType);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqRoomType,
  ): Promise<RoomType | Problem> {
    // [1] validate data
    const validMessages = ReqRoomType.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let roomType;
    try {
      roomType = await this.roomTypeRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomType) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomType.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      roomType.Name = body.name || roomType.Name;
      roomType.Description = body.description || roomType.Description;
      roomType.IsDefault = body.is_default || roomType.IsDefault;
      roomType.setBaseDataInfo(req);

      await this.roomTypeRepository.save(roomType);
      return Mapper.map(ResRoomType, roomType);
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
    // Get roomType by id from db
    let roomType;
    try {
      roomType = await this.roomTypeRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomType) {
        return Problem.NotFound(roomType.MSG_OBJ_NOT_FOUND(RoomType.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      roomType.DeleteFlag = DeleteFlag.Yes;
      await this.roomTypeRepository.save(roomType);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(RoomType.name, roomType.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

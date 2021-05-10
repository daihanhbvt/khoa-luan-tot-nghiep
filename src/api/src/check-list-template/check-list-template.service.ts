import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckListTemplate } from './entities/check-list-template.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCheckListTemplate } from './models/res.check-list-template.model';
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
import { ReqCheckListTemplate } from './models/req.check-list-template.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { Floors } from 'src/floors/entities/floors.entity';
import { Room } from 'src/room/entities/room.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
@Injectable()
export class CheckListTemplateService {
  constructor(
    @InjectRepository(CheckListTemplate)
    private checkListTemplateRepository: Repository<CheckListTemplate>,

    @InjectRepository(Floors)
    private floorsRepository: Repository<Floors>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.checkListTemplateRepository.findAndCount({
        relations: ['Floors', 'RoomType', 'Room'],
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
        data: Mapper.map(ResCheckListTemplate, rows[0]),
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
      const checkListTemplate = await this.checkListTemplateRepository.findOne({
        relations: ['CheckListTemplateItems'],
        where: {
          Id: id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        },
      });
      if (!checkListTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name),
        );
      }
      return Mapper.map(ResCheckListTemplate, checkListTemplate);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqCheckListTemplate,
  ): Promise<CheckListTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check floors id
    let floors: Floors;
    if (body.floors_id) {
      try {
        floors = await this.floorsRepository.findOne({
          Id: body.floors_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!floors) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // check room_type_id
    let roomType: RoomType;
    if (body.room_type_id) {
      try {
        roomType = await this.roomTypeRepository.findOne({
          Id: body.room_type_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!roomType) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomType.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // check room_id
    let room: Room;
    if (body.room_id) {
      try {
        room = await this.roomRepository.findOne({
          Id: body.room_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!room) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    try {
      const checkListTemplate = new CheckListTemplate();
      checkListTemplate.Name = body.name;
      checkListTemplate.Description = body.description;
      checkListTemplate.Room = room;
      checkListTemplate.RoomType = roomType;
      checkListTemplate.Floors = floors;
      checkListTemplate.IsDefault = body.is_default || false;
      checkListTemplate.setBaseDataInfo(req);

      await this.checkListTemplateRepository.save(checkListTemplate);
      return Mapper.map(ResCheckListTemplate, checkListTemplate);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCheckListTemplate,
  ): Promise<CheckListTemplate | Problem> {
    // [1] validate data
    const validMessages = ReqCheckListTemplate.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let checkListTemplate: CheckListTemplate;
    try {
      checkListTemplate = await this.checkListTemplateRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListTemplate) {
        return Problem.NotFound(
          Consts.MSG_OBJ_NOT_FOUND(CheckListTemplate.name),
        );
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // check floors id
    let floors: Floors;
    if (body.floors_id && checkListTemplate.FloorsId !== body.floors_id) {
      try {
        floors = await this.floorsRepository.findOne({
          Id: body.floors_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!floors) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // check roomtype id
    let roomType: RoomType;
    if (
      body.room_type_id &&
      checkListTemplate.RoomTypeId !== body.room_type_id
    ) {
      try {
        roomType = await this.roomTypeRepository.findOne({
          Id: body.room_type_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!roomType) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomType.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // check room id
    let room: Room;
    if (body.room_id && checkListTemplate.RoomId !== body.room_id) {
      try {
        room = await this.roomRepository.findOne({
          Id: body.room_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!room) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      checkListTemplate.Name = body.name || checkListTemplate.Name;
      checkListTemplate.Description =
        body.description || checkListTemplate.Description;
      checkListTemplate.RoomId = room?.Id || checkListTemplate.RoomId;
      checkListTemplate.FloorsId = floors?.Id || checkListTemplate.FloorsId;
      checkListTemplate.RoomTypeId =
        roomType?.Id || checkListTemplate.RoomTypeId;
      checkListTemplate.IsDefault =
        body.is_default || checkListTemplate.IsDefault;
      checkListTemplate.setBaseDataInfo(req);

      await this.checkListTemplateRepository.save(checkListTemplate);
      return Mapper.map(ResCheckListTemplate, checkListTemplate);
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
    // Get checkListTemplate by id from db
    let checkListTemplate;
    try {
      checkListTemplate = await this.checkListTemplateRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!checkListTemplate) {
        return Problem.NotFound(
          checkListTemplate.MSG_OBJ_NOT_FOUND(CheckListTemplate.name),
        );
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      checkListTemplate.DeleteFlag = DeleteFlag.Yes;
      await this.checkListTemplateRepository.save(checkListTemplate);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(
          CheckListTemplate.name,
          checkListTemplate.Id,
        ),
      );
    } catch (error) {
      return error;
    }
  }
}

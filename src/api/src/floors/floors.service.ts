import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Floors } from './entities/floors.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResFloors } from './../floors/models/res.floors.model';
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
import { ReqFloors } from './models/req.floors.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { Hotel } from 'src/hotel/entities/hotel.entity';
@Injectable()
export class FloorsService {
  constructor(
    @InjectRepository(Floors)
    private floorsRepository: Repository<Floors>,

    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    const hotelId = req.query.hotel_id;
    try {
      const rows = await this.floorsRepository.findAndCount({
        where: {
          DeleteFlag: DeleteFlag.None,
          SiteId: req.body.site_id,
          HotelId:  Like(`%${hotelId || ''}%`),
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
        data: Mapper.map(ResFloors, rows[0]),
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
      const floors = await this.floorsRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!floors) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
      }
      return Mapper.map(ResFloors, floors);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqFloors): Promise<Floors | Problem> {
    // [1] validate data
    const validMessages = ReqFloors.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check hotel id
    let hotel: Hotel;
    try {
      hotel = await this.hotelRepository.findOne({
        Id: body.hotel_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotel) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Hotel.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const floors = new Floors();
      floors.Name = body.name;
      floors.Description = body.description;
      floors.Hotel = hotel;

      floors.setBaseDataInfo(req);

      await this.floorsRepository.save(floors);
      return Mapper.map(ResFloors, floors);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqFloors,
  ): Promise<Floors | Problem> {
    // [1] validate data
    const validMessages = ReqFloors.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let floors;
    try {
      floors = await this.floorsRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!floors) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Floors.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let hotel: Hotel;
    if (body.hotel_id && floors.HotelId !== body.hotel_id) {
      // check hotel id
      let hotel: Hotel;
      try {
        hotel = await this.hotelRepository.findOne({
          Id: body.hotel_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!hotel) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Hotel.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // Update value
    try {
      floors.Name = body.name || floors.Name;
      floors.Description = body.description || floors.Description;
      floors.HotelId = hotel?.Id || floors.HotelId;

      floors.setBaseDataInfo(req);

      await this.floorsRepository.save(floors);
      return Mapper.map(ResFloors, floors);
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
    // Get floors by id from db
    let floors;
    try {
      floors = await this.floorsRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!floors) {
        return Problem.NotFound(floors.MSG_OBJ_NOT_FOUND(Floors.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      floors.DeleteFlag = DeleteFlag.Yes;
      await this.floorsRepository.save(floors);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Floors.name, floors.Id));
    } catch (error) {
      return error;
    }
  }
}

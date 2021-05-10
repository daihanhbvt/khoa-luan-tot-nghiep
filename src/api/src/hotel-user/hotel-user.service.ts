import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelUser } from './entities/hotel-user.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResHotelUser } from './../hotel-user/models/res.hotel-user.model';
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
import { ReqHotelUser } from './models/req.hotel-user.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class HotelUserService {
  constructor(
    @InjectRepository(HotelUser)
    private hotelUserRepository: Repository<HotelUser>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.hotelUserRepository.findAndCount({
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
        data: Mapper.map(ResHotelUser, rows[0]),
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
      const hotelUser = await this.hotelUserRepository.findOne({
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
      if (!hotelUser) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(HotelUser.name));
      }
      return Mapper.map(ResHotelUser, hotelUser);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqHotelUser): Promise<HotelUser | Problem> {
    // [1] validate data
    const validMessages = ReqHotelUser.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const hotelUser = new HotelUser();
      hotelUser.Name = body.name;
      hotelUser.Description = body.description;
      hotelUser.Data = body.data;
      hotelUser.setBaseDataInfo(req);

      await this.hotelUserRepository.save(hotelUser);
      return Mapper.map(ResHotelUser, hotelUser);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqHotelUser,
  ): Promise<HotelUser | Problem> {
    // [1] validate data
    const validMessages = ReqHotelUser.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let hotelUser;
    try {
      hotelUser = await this.hotelUserRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotelUser) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(HotelUser.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      hotelUser.Name = body.name || hotelUser.Name;
      hotelUser.Description = body.description || hotelUser.Description;
      hotelUser.Data = body.data || hotelUser.Data;
      hotelUser.setBaseDataInfo(req);

      await this.hotelUserRepository.save(hotelUser);
      return Mapper.map(ResHotelUser, hotelUser);
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
    // Get hotelUser by id from db
    let hotelUser;
    try {
      hotelUser = await this.hotelUserRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotelUser) {
        return Problem.NotFound(hotelUser.MSG_OBJ_NOT_FOUND(HotelUser.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      hotelUser.DeleteFlag = DeleteFlag.Yes;
      await this.hotelUserRepository.save(hotelUser);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(HotelUser.name, hotelUser.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

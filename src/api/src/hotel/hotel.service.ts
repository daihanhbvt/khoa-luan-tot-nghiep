import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResHotel } from './../hotel/models/res.hotel.model';
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
import { ReqHotel } from './models/req.hotel.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.hotelRepository.findAndCount({
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
        data: Mapper.map(ResHotel, rows[0]),
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
      const hotel = await this.hotelRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotel) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Hotel.name));
      }
      return Mapper.map(ResHotel, hotel);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqHotel): Promise<Hotel | Problem> {
    // [1] validate data
    const validMessages = ReqHotel.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const hotel = new Hotel();
      hotel.Name = body.name;
      hotel.Description = body.description;
      hotel.Email = body.email;
      hotel.Owner = body.owner;
      hotel.Phone = body.phone;
      hotel.Address = body.address;
      hotel.Start = body.start;
      hotel.CompanyId = body.companyId;
      hotel.setBaseDataInfo(req);

      await this.hotelRepository.save(hotel);
      return Mapper.map(ResHotel, hotel);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqHotel,
  ): Promise<Hotel | Problem> {
    // [1] validate data
    const validMessages = ReqHotel.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let hotel;
    try {
      hotel = await this.hotelRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotel) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Hotel.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      hotel.Name = body.name || hotel.Name;
      hotel.Description = body.description || hotel.Description;
      hotel.Email = body.email || hotel.Email;
      hotel.Owner = body.owner || hotel.Owner;
      hotel.Phone = body.phone || hotel.Phone;
      hotel.Address = body.address || hotel.Address;
      hotel.Start = body.start || hotel.Start;
      hotel.CompanyId = body.companyId || hotel.CompanyId;
      hotel.setBaseDataInfo(req);

      await this.hotelRepository.save(hotel);
      return Mapper.map(ResHotel, hotel);
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
    // Get hotel by id from db
    let hotel;
    try {
      hotel = await this.hotelRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!hotel) {
        return Problem.NotFound(hotel.MSG_OBJ_NOT_FOUND(Hotel.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      hotel.DeleteFlag = DeleteFlag.Yes;
      await this.hotelRepository.save(hotel);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Hotel.name, hotel.Id));
    } catch (error) {
      return error;
    }
  }
}

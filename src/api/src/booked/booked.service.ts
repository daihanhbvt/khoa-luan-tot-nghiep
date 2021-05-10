import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booked } from './entities/booked.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResBooked } from './../booked/models/res.booked.model';
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
import { ReqBooked } from './models/req.booked.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { Room } from 'src/room/entities/room.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
@Injectable()
export class BookedService {
  constructor(
    @InjectRepository(Booked)
    private bookedRepository: Repository<Booked>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.bookedRepository.findAndCount({
        relations: [RoomStatus.name, Customer.name, Room.name],
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
        data: Mapper.map(ResBooked, rows[0]),
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
      const booked = await this.bookedRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!booked) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Booked.name));
      }
      return Mapper.map(ResBooked, booked);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqBooked): Promise<Booked | Problem> {
    // [1] validate data
    const validMessages = ReqBooked.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check room_id
    let room: Room;
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

    // check customer
    let customer: Customer;
    try {
      customer = await this.customerRepository.findOne({
        Id: body.customer_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!customer) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Customer.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    // check room_status
    let roomStatus: RoomStatus;
    try {
      roomStatus = await this.roomStatusRepository.findOne({
        Id: body.room_status_id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!roomStatus) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomStatus.name));
      }
    } catch (ex) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.InternalServerError();
    }

    try {
      const booked = new Booked();
      booked.Name = body.name;
      booked.Description = body.description;
      booked.FromDate = body.from_date;
      booked.ToDate = body.to_date;
      booked.Room = room;
      booked.Customer = customer;
      booked.RoomStatus = roomStatus;
      booked.setBaseDataInfo(req);

      await this.bookedRepository.save(booked);
      return Mapper.map(ResBooked, booked);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqBooked,
  ): Promise<Booked | Problem> {
    // [1] validate data
    const validMessages = ReqBooked.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let booked;
    try {
      booked = await this.bookedRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!booked) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Booked.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    let room: Room;
    if (body.room_id && booked.RoomId !== body.room_id) {
      // check room id
      let room: Room;
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

    let customer: Customer;
    if (body.customer_id && booked.CustomerId !== body.customer_id) {
      // check customer id
      let customer: Customer;
      try {
        customer = await this.customerRepository.findOne({
          Id: body.customer_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!customer) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Customer.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    let roomStatus: RoomStatus;
    if (body.room_status_id && booked.RoomStatusId !== body.room_status_id) {
      // check room status id
      let roomStatus: RoomStatus;
      try {
        roomStatus = await this.roomStatusRepository.findOne({
          Id: body.room_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!roomStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(RoomStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      booked.Name = body.name || booked.Name;
      booked.Description = body.description || booked.Description;
      booked.FromDate = body.from_date || booked.FromDate;
      booked.ToDate = body.to_date || booked.ToDate;
      booked.RoomId = room?.Id || booked.RoomId;
      booked.RoomStatusId = roomStatus?.Id || booked.RoomStatusId;
      booked.CustomerId = customer?.Id || booked.CustomerId;
      booked.setBaseDataInfo(req);

      await this.bookedRepository.save(booked);
      return Mapper.map(ResBooked, booked);
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
    // Get booked by id from db
    let booked;
    try {
      booked = await this.bookedRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!booked) {
        return Problem.NotFound(booked.MSG_OBJ_NOT_FOUND(Booked.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      booked.DeleteFlag = DeleteFlag.Yes;
      await this.bookedRepository.save(booked);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Booked.name, booked.Id));
    } catch (error) {
      return error;
    }
  }
}

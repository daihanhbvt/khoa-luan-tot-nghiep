import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository, Like, In } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResRoom } from './../room/models/res.room.model';
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
import { ReqRoom } from './models/req.room.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { Floors } from 'src/floors/entities/floors.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { RequestTarget as request } from 'src/common';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Floors)
    private floorsRepository: Repository<Floors>,

    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,

    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,

    @InjectRepository(CleanStatus)
    private cleanStatusRepository: Repository<CleanStatus>,

    @InjectRepository(CheckStatus)
    private checkStatusRepository: Repository<CheckStatus>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const floorsId = req.query.floors_id;
      const rows: any = await this.roomRepository.findAndCount({
        relations: [
          RoomType.name,
          Floors.name,
          RoomStatus.name,
          CheckStatus.name,
          CleanStatus.name,
          'Bookeds',
          'Assignments',
        ],
        where: {
          DeleteFlag: DeleteFlag.None,
          SiteId: req.body.site_id,
          FloorsId:  Like(`%${floorsId || ''}%`),
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
      let books = [];
      rows[0].map(r => {
        console.log('books', books);
        if (r.Bookeds && r.Bookeds.length > 0) {
          books = books.concat(r.Bookeds);
        }
      });
      let customerIds = books.map(b => b.CustomerId);
      if (customerIds.length > 0) {
        let customers = await this.customerRepository.find({
          where: {
            DeleteFlag: DeleteFlag.None,
            SiteId: req.body.site_id,
            Id: In(customerIds),
          },
        });
        rows[0].map(r => {
          r.Bookeds.map(
            b => (b.Customer = customers.find(c => c.Id === b.CustomerId)),
          );
        });
      }

      let roomStatusIds = books.map(b => b.RoomStatusId);
      if (roomStatusIds.length > 0) {
        let roomStatuses = await this.roomStatusRepository.find({
          where: {
            DeleteFlag: DeleteFlag.None,
            SiteId: req.body.site_id,
            Id: In(roomStatusIds),
          },
        });
        rows[0].map(r => {
          r.Bookeds.map(
            b =>
              (b.RoomStatus = roomStatuses.find(r => r.Id === b.RoomStatusId)),
          );
        });
      }

      let assignments: Assignment[] = [];
      rows[0].map(r => {
        // same
        if (r.Assignments && r.Assignments.length > 0) {
          assignments = assignments.concat(r.Assignments);
        }
      });
      let employeeIds = assignments.map(a => a.EmployeeId) || [];
      let supervisorIds = assignments.map(a => a.SupervisorId) || [];
      let userIds = employeeIds.concat(supervisorIds);
      console.log(userIds);
      // get users by ids
      if (userIds.length > 0) {
        try {
          req.body.ids = userIds;
          let res: any = await request.post(req, {
            url: `${process.env.AUTH_API}/user/ids`,
          });
          let users = res.data;
          console.log(res);
          console.log('res', res);
          if (res.data && res.data.length > 0) {
            rows[0].map(r => {
              r.Assignments.map(a => {
                a.Employee = users.find(u => u.id === a.EmployeeId);
                a.Supervisor = users.find(u => u.id === a.SupervisorId);
              });
            });
          }
        } catch (error) {}
      }

      return {
        data: Mapper.map(ResRoom, rows[0]),
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
      const room = await this.roomRepository.findOne({
        relations: ['Booked'],
        where: {
          Id: id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        },
      });
      if (!room) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
      }
      return Mapper.map(ResRoom, room);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqRoom): Promise<Room | Problem> {
    // [1] validate data
    const validMessages = ReqRoom.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    // check floors id
    let floors: Floors;
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

    // check room_status_id
    let roomStatus: RoomStatus;
    if (body.room_status_id) {
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

    // check clean_status_id
    let cleanStatus: CleanStatus;
    if (body.clean_status_id) {
      try {
        cleanStatus = await this.cleanStatusRepository.findOne({
          Id: body.clean_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!cleanStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // check check_status_id
    let checkStatus: CheckStatus;
    if (body.check_status_id) {
      try {
        checkStatus = await this.checkStatusRepository.findOne({
          Id: body.check_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    try {
      const room = new Room();
      room.Name = body.name;
      room.Description = body.description;
      room.Floors = floors;
      room.RoomType = roomType;
      room.RoomStatus = roomStatus;
      room.CleanStatus = cleanStatus;
      room.CheckStatus = checkStatus;
      room.setBaseDataInfo(req);

      await this.roomRepository.save(room);
      return Mapper.map(ResRoom, room);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqRoom,
  ): Promise<Room | Problem> {
    // [1] validate data
    const validMessages = ReqRoom.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let room: Room;
    try {
      room = await this.roomRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!room) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Room.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // check floors id
    let floors: Floors;
    if (body.floors_id && room.FloorsId !== body.floors_id) {
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
    if (body.room_type_id && room.RoomTypeId !== body.room_type_id) {
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
    // check room status id
    let roomStatus: RoomStatus;
    if (body.room_status_id && room.RoomStatusId !== body.room_status_id) {
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
    // check clean_status_id
    let cleanStatus: CleanStatus;
    if (body.clean_status_id && room.CleanStatusId !== body.clean_status_id) {
      try {
        cleanStatus = await this.cleanStatusRepository.findOne({
          Id: body.clean_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!cleanStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CleanStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // check clean_status_id
    let checkStatus: CheckStatus;
    if (body.check_status_id && room.CheckStatusId !== body.check_status_id) {
      try {
        checkStatus = await this.checkStatusRepository.findOne({
          Id: body.check_status_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!checkStatus) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(CheckStatus.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }
    // Update value
    try {
      room.Name = body.name || room.Name;
      room.Description = body.description || room.Description;
      room.FloorsId = floors?.Id || room.FloorsId;
      room.RoomTypeId = roomType?.Id || room.RoomTypeId;
      room.RoomStatusId = roomStatus?.Id || room.RoomStatusId;
      room.CleanStatusId = cleanStatus?.Id || room.CleanStatusId;
      room.CheckStatusId = checkStatus?.Id || room.CheckStatusId;
      room.setBaseDataInfo(req);

      await this.roomRepository.save(room);
      return Mapper.map(ResRoom, room);
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
    // Get room by id from db
    let room;
    try {
      room = await this.roomRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!room) {
        return Problem.NotFound(room.MSG_OBJ_NOT_FOUND(Room.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      room.DeleteFlag = DeleteFlag.Yes;
      await this.roomRepository.save(room);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Room.name, room.Id));
    } catch (error) {
      return error;
    }
  }
}

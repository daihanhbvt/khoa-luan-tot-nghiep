import { Floors } from '../floors/entities/floors.entity';
import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Init } from './entities/init.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResInit } from './models/res.init.model';
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
import { ReqInit } from './models/req.init.model';
import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { RoomStatusTemplate } from 'src/room-status-template/entities/room-status-template.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { CheckStatusTemplate } from 'src/check-status-template/entities/check-status-template.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatusTemplate } from 'src/clean-status-template/entities/clean-status-template.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { RoomTypeTemplate } from 'src/room-type-template/entities/room-type-template.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Room } from 'src/room/entities/room.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Booked } from 'src/booked/entities/booked.entity';
import { Clean } from 'src/clean/entities/clean.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListItem } from 'src/check-list-item/entities/check-list-item.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
@Injectable()
export class InitService {
  constructor(
    @InjectRepository(RoomStatusTemplate)
    private roomStatusTemplateRepository: Repository<RoomStatusTemplate>,

    @InjectRepository(RoomStatus)
    private roomStatusRepository: Repository<RoomStatus>,

    @InjectRepository(CheckStatusTemplate)
    private checkStatusTemplateRepository: Repository<CheckStatusTemplate>,

    @InjectRepository(CheckStatus)
    private checkStatusRepository: Repository<CheckStatus>,

    @InjectRepository(CleanStatusTemplate)
    private cleanStatusTemplateRepository: Repository<CleanStatusTemplate>,

    @InjectRepository(CleanStatus)
    private cleanStatusRepository: Repository<CleanStatus>,

    @InjectRepository(RoomTypeTemplate)
    private roomTypeTemplateRepository: Repository<RoomTypeTemplate>,

    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,

    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,

    @InjectRepository(Floors)
    private floorsRepository: Repository<Floors>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Booked)
    private bookedRepository: Repository<Booked>,

    @InjectRepository(Clean)
    private cleanRepository: Repository<Clean>,

    @InjectRepository(CheckListTemplate)
    private checkListTemplateRepository: Repository<CheckListTemplate>,

    @InjectRepository(CheckList)
    private checkListRepository: Repository<CheckList>,

    @InjectRepository(PublicArea)
    private publicAreaRepository: Repository<PublicArea>,
  ) {}

  async create(req: Request, body: ReqInit): Promise<any | Problem> {
    // Create masterdata

    // create status from template ==> lam cac bang co template tuong tu o day, tru checklist template
    //RoomStatusTemplate
    let roomStatusTemplate: RoomStatusTemplate[];
    try {
      roomStatusTemplate = await this.roomStatusTemplateRepository.find();
    } catch (error) {}
    let roomStatus: RoomStatus[];
    try {
      let arrRoomStatus = [];
      for (let i = 0; i < roomStatusTemplate.length; i++) {
        let rst = roomStatusTemplate[i];
        let roomStatus = new RoomStatus();
        roomStatus.Name = rst.Name;
        roomStatus.Description = rst.Description;
        roomStatus.IsDefault = rst.IsDefault;
        roomStatus.setBaseDataInfo(req);
        arrRoomStatus.push(roomStatus);
      }
      roomStatus = await this.roomStatusRepository.save(arrRoomStatus);
    } catch (error) {}
    //  create status from template
    //CheckStatusTemplate
    let checkStatusTemplate: CheckStatusTemplate[];
    try {
      checkStatusTemplate = await this.checkStatusTemplateRepository.find();
    } catch (error) {}
    let checkStatus: CheckStatus[];
    try {
      let arrCheckStatus = [];
      for (let i = 0; i < checkStatusTemplate.length; i++) {
        let rst = checkStatusTemplate[i];
        let checkStatus = new CheckStatus();
        checkStatus.Name = rst.Name;
        checkStatus.Description = rst.Description;
        checkStatus.IsDefault = rst.IsDefault;
        checkStatus.setBaseDataInfo(req);
        arrCheckStatus.push(checkStatus);
      }
      checkStatus = await this.checkStatusRepository.save(arrCheckStatus);
    } catch (error) {}

    //cleanStatusTemplate
    let cleanStatusTemplate: CleanStatusTemplate[];
    try {
      cleanStatusTemplate = await this.cleanStatusTemplateRepository.find();
    } catch (error) {}
    let cleanStatus: CleanStatus[];
    try {
      let arrCleanStatus = [];
      for (let i = 0; i < cleanStatusTemplate.length; i++) {
        let rst = cleanStatusTemplate[i];
        let cleanStatus = new CleanStatus();
        cleanStatus.Name = rst.Name;
        cleanStatus.Description = rst.Description;
        cleanStatus.IsDefault = rst.IsDefault;
        cleanStatus.setBaseDataInfo(req);
        arrCleanStatus.push(cleanStatus);
      }
      cleanStatus = await this.cleanStatusRepository.save(arrCleanStatus);
    } catch (error) {}
    //RoomTypeTemplate
    let roomTypeTemplate: RoomTypeTemplate[];
    try {
      roomTypeTemplate = await this.roomTypeTemplateRepository.find();
    } catch (error) {}
    let roomType: RoomType[];
    try {
      let arrRoomType = [];
      for (let i = 0; i < roomTypeTemplate.length; i++) {
        let rst = roomTypeTemplate[i];
        let roomType = new RoomType();
        roomType.Name = rst.Name;
        roomType.Description = rst.Description;
        roomType.IsDefault = rst.IsDefault;
        roomType.setBaseDataInfo(req);
        arrRoomType.push(roomType);
      }
      roomType = await this.roomTypeRepository.save(arrRoomType);
    } catch (error) {}

    // create sample data for company

    // 1 hotel
    let hotel: Hotel;
    try {
      hotel = new Hotel();
      hotel.Name = 'Hotel 1';
      hotel.CompanyId = body.company_id;
      hotel.setBaseDataInfo(req);
      hotel = await this.hotelRepository.save(hotel);
    } catch (error) {}

    // 2 floors
    let floors: Floors;
    try {
      floors = new Floors();
      floors.Name = 'Floors 1';
      floors.Hotel = hotel;
      floors.setBaseDataInfo(req);
      floors = await this.floorsRepository.save(hotel);
    } catch (error) {}
    // 3 room
    let room: Room;
    try {
      room = new Room();
      room.Name = 'Room 1';
      room.Floors = floors;
      room.RoomType = roomType.find(r => r.IsDefault);

      room.setBaseDataInfo(req);
      room = await this.roomRepository.save(room);
    } catch (error) {}

    // create customer
    let customer: Customer;
    try {
      customer = new Customer();
      customer.Name = 'Customer 1';
      customer.setBaseDataInfo(req);
      customer = await this.customerRepository.save(customer);
    } catch (error) {}

    // 4 book
    let booked: Booked;
    try {
      booked = new Booked();
      booked.Room = room;
      booked.Customer = customer;
      booked.FromDate = new Date();
      booked.ToDate = new Date();
      booked.RoomStatus = roomStatus.find(rs => rs.IsDefault);

      booked.setBaseDataInfo(req);

      booked = await this.bookedRepository.save(booked);
    } catch (error) {
      console.log(error);
    }

    // assignmentRepository asssing room
    // 5 assign
    let assignment: Assignment;
    try {
      assignment = new Assignment();
      assignment.Room = room;
      assignment.CleanDate = new Date();
      assignment.EmployeeId = req.body.auth_user.id;
      assignment.SupervisorId = req.body.auth_user.id;
      assignment.setBaseDataInfo(req);
      assignment = await this.assignmentRepository.save(assignment);
    } catch (error) {}
    // 6 clean
    let clean: Clean;
    try {
      clean = new Clean();
      clean.Assignment = assignment;
      clean.CleanStatus = cleanStatus.find(c => c.IsDefault);

      clean.setBaseDataInfo(req);
      clean = await this.cleanRepository.save(clean);
    } catch (error) {}
    // 7 checklist
    // get checklist template by roomtype default
    let checkListTemplate: CheckListTemplate;
    try {
      checkListTemplate = await this.checkListTemplateRepository.findOne({
        relations: ['CheckListTemplateItems'],
        where: {
          RoomType: roomType.find(r => r.IsDefault),
        },
      });

      if (!checkListTemplate) {
        console.log('checklist template not found');
      }
    } catch (error) {}
    // assign checklist from checklist template
    let checkList: CheckList;
    try {
      let checkListItems = checkListTemplate.CheckListTemplateItems.map(
        item => {
          let checkListItem = new CheckListItem();
          checkListItem.Name = item.Name;
          return checkListItem;
        },
      );

      checkList = new CheckList();
      checkList.Name = checkListTemplate.Name;
      checkList.Clean = clean;
      checkList.CheckListItems = checkListItems;
      checkList.setBaseDataInfo(req);
      checkList = await this.checkListRepository.save(checkList);
    } catch (error) {}

    let publicArea: PublicArea;
    try {
      publicArea.Name = 'Sanh';
      publicArea.Floors = floors;
      publicArea.setBaseDataInfo(req);
      publicArea = await this.publicAreaRepository.save(publicArea);
    } catch (error) {}

    // assignmentRepository asssing room
    // 5 assign
    let assignmentPublicArea: Assignment;
    try {
      assignmentPublicArea = new Assignment();
      assignmentPublicArea.PublicArea = publicArea;
      assignmentPublicArea.CleanDate = new Date();
      assignmentPublicArea.EmployeeId = req.body.auth_user.id;
      assignmentPublicArea.SupervisorId = req.body.auth_user.id;
      assignmentPublicArea.setBaseDataInfo(req);
      assignmentPublicArea = await this.assignmentRepository.save(
        assignmentPublicArea,
      );
    } catch (error) {}
    // 6 clean
    let cleanPublicArea: Clean;
    try {
      cleanPublicArea = new Clean();
      cleanPublicArea.Assignment = assignmentPublicArea;
      cleanPublicArea.CleanStatus = cleanStatus.find(c => c.IsDefault);

      cleanPublicArea.setBaseDataInfo(req);
      cleanPublicArea = await this.cleanRepository.save(cleanPublicArea);
    } catch (error) {}
    // 7 checklist
    // get checklist template by roomtype default
    let checkListTemplatePublicArea: CheckListTemplate;
    try {
      checkListTemplatePublicArea = await this.checkListTemplateRepository.findOne(
        {
          relations: ['CheckListTemplateItems'],
          where: {
            RoomType: roomType.find(r => r.IsDefault),
          },
        },
      );

      if (!checkListTemplatePublicArea) {
        console.log('checklist template not found');
      }
    } catch (error) {}
    // assign checklist from checklist template
    let checkListPublicArea: CheckList;
    try {
      let checkListItems = checkListTemplate.CheckListTemplateItems.map(
        item => {
          let checkListItem = new CheckListItem();
          checkListItem.Name = item.Name;
          checkListItem.setBaseDataInfo(req);
          return checkListItem;
        },
      );

      checkListPublicArea = new CheckList();
      checkListPublicArea.Name = checkListTemplate.Name;
      checkListPublicArea.Clean = cleanPublicArea;
      checkListPublicArea.CheckListItems = checkListItems;
      checkListPublicArea.setBaseDataInfo(req);
      checkListPublicArea = await this.checkListRepository.save(
        checkListPublicArea,
      );
    } catch (error) {}

    return hotel; //Problem.Ok("init successfully");
  }

  public assignRoom() {}
}

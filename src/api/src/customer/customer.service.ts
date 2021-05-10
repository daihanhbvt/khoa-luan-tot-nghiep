import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
import { ResCustomer } from './../customer/models/res.customer.model';
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
import { ReqCustomer } from './models/req.customer.model';
import { isNullOrUndefined } from 'util';
import * as Consts from './../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.customerRepository.findAndCount({
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
        data: Mapper.map(ResCustomer, rows[0]),
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
      const customer = await this.customerRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!customer) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Customer.name));
      }
      return Mapper.map(ResCustomer, customer);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqCustomer): Promise<Customer | Problem> {
    // [1] validate data
    const validMessages = ReqCustomer.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const customer = new Customer();
      customer.Name = body.name;
      customer.Description = body.description;
      customer.Birthday = body.birthday;
      customer.Phone = body.phone;
      customer.Address = body.address;
      customer.Email = body.email;
      customer.Gender = body.gender;
      customer.IdentityCard = body.identity_card;
      customer.LoginCode = body.login_code;
      customer.LogincodeExpired = body.logincode_expired;
      customer.setBaseDataInfo(req);

      await this.customerRepository.save(customer);
      return Mapper.map(ResCustomer, customer);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqCustomer,
  ): Promise<Customer | Problem> {
    // [1] validate data
    const validMessages = ReqCustomer.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let customer;
    try {
      customer = await this.customerRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!customer) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Customer.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      customer.Name = body.name || customer.Name;
      customer.Description = body.description || customer.Description;
      customer.Birthday = body.birthday || customer.Birthday;
      customer.Phone = body.phone || customer.Phone;
      customer.Address = body.address || customer.Address;
      customer.Email = body.email || customer.Email;
      customer.Gender = body.gender || customer.Gender;
      customer.IdentityCard = body.identity_card || customer.IdentityCard;
      customer.LoginCode = body.login_code || customer.LoginCode;
      customer.LogincodeExpired =
        body.logincode_expired || customer.LogincodeExpired;
      customer.setBaseDataInfo(req);

      await this.customerRepository.save(customer);
      return Mapper.map(ResCustomer, customer);
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
    // Get customer by id from db
    let customer;
    try {
      customer = await this.customerRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!customer) {
        return Problem.NotFound(customer.MSG_OBJ_NOT_FOUND(Customer.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      customer.DeleteFlag = DeleteFlag.Yes;
      await this.customerRepository.save(customer);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(Customer.name, customer.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

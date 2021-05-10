import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from '../common/enums';
import { ReqBrand } from './models/req.brand.model';
import { Pagination } from '../base-model/paging.model';
import { Mapper } from '../common/mapper';
import { ResBrand } from './models/res.brand.model';
import { IPagination } from '../base-model/pagination-result';
import {
  GetAllAction,
  Problem,
  UpdateAction,
  GetAction,
  CreateAction,
  DeleteAction,
} from '../common';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.brandRepository.findAndCount({
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
        data: Mapper.map(ResBrand, rows[0]),
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
      const brand = await this.brandRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!brand) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Brand.name));
      }
      return Mapper.map(ResBrand, brand);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(req: Request, body: ReqBrand): Promise<Brand | Problem> {
    // [1] validate data
    const validMessages = ReqBrand.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }

    try {
      const brand = new Brand();
      brand.Name = body.name;
      brand.Description = body.description;
      brand.setBaseDataInfo(req);
      await this.brandRepository.save(brand);
      return Mapper.map(ResBrand, brand);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqBrand,
  ): Promise<Brand | Problem> {
    // [1] validate data
    const validMessages = ReqBrand.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let brand;
    try {
      brand = await this.brandRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!brand) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Brand.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
    // Update value
    try {
      brand.Name = body.name || brand.Name;
      brand.Description = body.description || brand.Description;
      brand.setBaseDataInfo(req);
      await this.brandRepository.save(brand);
      return Mapper.map(ResBrand, brand);
    } catch (error) {
      Logger.log(UpdateAction.UpdateValue, error);
      return Problem.InternalServerError();
    }
  }

  async delete(req: Request, id): Promise<Problem> {
    // Check id
    if (!id) {
      return new Problem({
        status: HttpStatus.BAD_REQUEST,
        message: Consts.MSG_FIELD_REQUIRED(BaseFields.Id),
      });
    }
    // Get brand by id from db
    let brand;
    try {
      brand = await this.brandRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!brand) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Brand.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      brand.DeleteFlag = DeleteFlag.Yes;
      await this.brandRepository.save(brand);
      return Problem.Ok(Consts.MSG_DELETE_SUCCESSFULLY(Brand.name, brand.Id));
    } catch (error) {
      return error;
    }
  }
}

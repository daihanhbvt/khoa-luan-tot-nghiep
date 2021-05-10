import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository, Like } from 'typeorm';
import { DeleteFlag } from 'src/common/enums';
import { Pagination } from 'src/base-model/paging.model';
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

import { isNullOrUndefined } from 'util';
import * as Consts from '../common/consts';
import { BaseFields } from 'src/entities/base-system-fields';
import { Request } from 'express';
import { ResComment } from './models/res.comment.model';
import { ReqComment } from './models/req.comment.model';
import { Clean } from 'src/clean/entities/clean.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Clean)
    private cleanRepository: Repository<Clean>,
  ) { }

  // Get all data
  async findAll(req: Request, paging?: Pagination) {
    try {
      const rows = await this.commentRepository.findAndCount({
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
        data: Mapper.map(ResComment, rows[0]),
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
      const comment = await this.commentRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!comment) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Comment.name));
      }
      return Mapper.map(ResComment, comment);
    } catch (error) {
      Logger.error(GetAction.GetFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async create(
    req: Request,
    body: ReqComment,
  ): Promise<Comment | Problem> {
    // [1] validate data
    const validMessages = ReqComment.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(CreateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }


    // check clean_id
    let clean: Clean;
    if (body.clean_id) {
      try {
        clean = await this.cleanRepository.findOne({
          Id: body.clean_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!clean) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }

    }

    try {
      const comment = new Comment();
      comment.Content = body.content;
      comment.Clean = clean;
      comment.UserId = req.body.auth_user.user_id;

      comment.setBaseDataInfo(req);

      await this.commentRepository.save(comment);
      return Mapper.map(ResComment, comment);
    } catch (error) {
      Logger.error(CreateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }
  }

  async update(
    req: Request,
    id: string,
    body: ReqComment,
  ): Promise<Comment | Problem> {
    // [1] validate data
    const validMessages = ReqComment.runValidator(body);
    if (validMessages?.length > 0) {
      Logger.log(UpdateAction.ValidateRequest);
      return Problem.BadRequest(validMessages);
    }
    // [2] Check exist on DB
    // tslint:disable-next-line:prefer-const
    let comment;
    try {
      comment = await this.commentRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!comment) {
        return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Comment.name));
      }
    } catch (error) {
      Logger.error(UpdateAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // check clean_id
    let clean: Clean;
    if (
      body.clean_id &&
      comment.clean !== body.clean_id
    ) {
      try {
        clean = await this.cleanRepository.findOne({
          Id: body.clean_id,
          SiteId: req.body.site_id,
          DeleteFlag: DeleteFlag.None,
        });
        if (!clean) {
          return Problem.NotFound(Consts.MSG_OBJ_NOT_FOUND(Clean.name));
        }
      } catch (ex) {
        Logger.log(CreateAction.ValidateRequest);
        return Problem.InternalServerError();
      }
    }

    // Update value
    try {
      comment.Content = body.content || comment.Content;
      comment.CleanId = comment?.Id || comment.CleanId;

      comment.setBaseDataInfo(req);

      await this.commentRepository.save(comment);
      return Mapper.map(ResComment, comment);
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
    // Get comment by id from db
    let comment;
    try {
      comment = await this.commentRepository.findOne({
        Id: id,
        SiteId: req.body.site_id,
        DeleteFlag: DeleteFlag.None,
      });
      if (!comment) {
        return Problem.NotFound(comment.MSG_OBJ_NOT_FOUND(Comment.name));
      }
    } catch (error) {
      Logger.log(DeleteAction.CheckFromDB, error);
      return Problem.InternalServerError();
    }

    // change flag save to db
    try {
      comment.DeleteFlag = DeleteFlag.Yes;
      await this.commentRepository.save(comment);
      return Problem.Ok(
        Consts.MSG_DELETE_SUCCESSFULLY(Comment.name, comment.Id),
      );
    } catch (error) {
      return error;
    }
  }
}

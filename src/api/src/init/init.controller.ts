import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { InitService } from './init.service';
import { Init } from './entities/init.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqInit } from './models/req.init.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('Init')
@Controller('init')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class InitController {
  constructor(private readonly initService: InitService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: ReqInit,
  ): Promise<Init | Problem> {
    const result = this.initService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

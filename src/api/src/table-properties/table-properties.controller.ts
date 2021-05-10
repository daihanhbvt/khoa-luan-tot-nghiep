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
import { TablePropertiesService } from './table-properties.service';
import { TableProperties } from './entities/table-properties.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqTableProperties } from './../table-properties/models/req.table-properties.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('TableProperties')
@Controller('table-properties')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class TablePropertiesController {
  constructor(
    private readonly tablePropertiesService: TablePropertiesService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.tablePropertiesService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get(':id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.tablePropertiesService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqTableProperties,
  ): Promise<TableProperties | Problem> {
    const result = this.tablePropertiesService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqTableProperties,
  ): Promise<TableProperties | Problem> {
    const result = this.tablePropertiesService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.tablePropertiesService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

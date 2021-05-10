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
import { RoomStatusTemplateService } from './room-status-template.service';
import { RoomStatusTemplate } from './entities/room-status-template.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqRoomStatusTemplate } from './models/req.room-status-template.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('RoomStatusTemplate')
@Controller('room-status-template')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class RoomStatusTemplateController {
  constructor(
    private readonly roomStatusTemplateService: RoomStatusTemplateService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.roomStatusTemplateService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.roomStatusTemplateService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqRoomStatusTemplate,
  ): Promise<RoomStatusTemplate | Problem> {
    const result = this.roomStatusTemplateService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqRoomStatusTemplate,
  ): Promise<RoomStatusTemplate | Problem> {
    const result = this.roomStatusTemplateService.update(req, id, body);
    RoomStatusTemplate;
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.roomStatusTemplateService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

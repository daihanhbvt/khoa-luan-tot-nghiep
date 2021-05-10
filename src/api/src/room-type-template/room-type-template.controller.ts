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
import { RoomTypeTemplateService } from './room-type-template.service';
import { RoomTypeTemplate } from './entities/room-type-template.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqRoomTypeTemplate } from './models/req.room-type-template.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('RoomTypeTemplate')
@Controller('room-type-template')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class RoomTypeTemplateController {
  constructor(
    private readonly roomTypeTemplateService: RoomTypeTemplateService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.roomTypeTemplateService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.roomTypeTemplateService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqRoomTypeTemplate,
  ): Promise<RoomTypeTemplate | Problem> {
    const result = this.roomTypeTemplateService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqRoomTypeTemplate,
  ): Promise<RoomTypeTemplate | Problem> {
    const result = this.roomTypeTemplateService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.roomTypeTemplateService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

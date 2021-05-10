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
import { RoomStatusService } from './room-status.service';
import { RoomStatus } from './entities/room-status.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqRoomStatus } from './models/req.room-status.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('RoomStatus')
@Controller('room-status')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.roomStatusService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.roomStatusService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqRoomStatus,
  ): Promise<RoomStatus | Problem> {
    const result = this.roomStatusService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqRoomStatus,
  ): Promise<RoomStatus | Problem> {
    const result = this.roomStatusService.update(req, id, body);
    RoomStatus;
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.roomStatusService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

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
import { HotelUserService } from './hotel-user.service';
import { HotelUser } from './entities/hotel-user.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqHotelUser } from './../hotel-user/models/req.hotel-user.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('HotelUser')
@Controller('hotel-user')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class HotelUserController {
  constructor(private readonly hotelUserService: HotelUserService) {}

  @Get()
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.hotelUserService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get(':id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.hotelUserService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: ReqHotelUser,
  ): Promise<HotelUser | Problem> {
    const result = this.hotelUserService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqHotelUser,
  ): Promise<HotelUser | Problem> {
    const result = this.hotelUserService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.hotelUserService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

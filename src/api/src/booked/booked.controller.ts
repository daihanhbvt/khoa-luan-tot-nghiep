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
import { BookedService } from './booked.service';
import { Booked } from './entities/booked.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqBooked } from './../booked/models/req.booked.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('Booked')
@Controller('booked')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class BookedController {
  constructor(private readonly bookedService: BookedService) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.bookedService.findAll(req, new Pagination(query));
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.bookedService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqBooked,
  ): Promise<Booked | Problem> {
    const result = this.bookedService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqBooked,
  ): Promise<Booked | Problem> {
    const result = this.bookedService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.bookedService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

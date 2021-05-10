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
import { CheckListItemService } from './check-list-item.service';
import { CheckListItem } from './entities/check-list-item.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCheckListItem } from './models/req.check-list-item.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('CheckListItem')
@Controller('check-list-item')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CheckListItemController {
  constructor(private readonly checkListItemService: CheckListItemService) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.checkListItemService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.checkListItemService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqCheckListItem,
  ): Promise<CheckListItem | Problem> {
    const result = this.checkListItemService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCheckListItem,
  ): Promise<CheckListItem | Problem> {
    const result = this.checkListItemService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.checkListItemService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

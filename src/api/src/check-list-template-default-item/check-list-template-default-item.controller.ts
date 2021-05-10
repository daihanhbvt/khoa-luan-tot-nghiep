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
import { CheckListTemplateDefaultItemService } from './check-list-template-default-item.service';
import { CheckListTemplateDefaultItem } from './entities/check-list-template-default-item.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCheckListTemplateDefaultItem } from './models/req.check-list-template-default-item.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('CheckListTemplateDefaultItem')
@Controller('check-list-template-default-item')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CheckListTemplateDefaultItemController {
  constructor(
    private readonly checkListTemplateDefaultItemService: CheckListTemplateDefaultItemService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.checkListTemplateDefaultItemService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.checkListTemplateDefaultItemService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqCheckListTemplateDefaultItem,
  ): Promise<CheckListTemplateDefaultItem | Problem> {
    const result = this.checkListTemplateDefaultItemService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCheckListTemplateDefaultItem,
  ): Promise<CheckListTemplateDefaultItem | Problem> {
    const result = this.checkListTemplateDefaultItemService.update(
      req,
      id,
      body,
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.checkListTemplateDefaultItemService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

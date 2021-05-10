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
import { CheckListTemplateDefaultService } from './check-list-template-default.service';
import { CheckListTemplateDefault } from './entities/check-list-template-default.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCheckListTemplateDefault } from './models/req.check-list-template-default.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('CheckListTemplateDefault')
@Controller('check-list-template-default')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CheckListTemplateDefaultController {
  constructor(
    private readonly checkListTemplateDefaultService: CheckListTemplateDefaultService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.checkListTemplateDefaultService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.checkListTemplateDefaultService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqCheckListTemplateDefault,
  ): Promise<CheckListTemplateDefault | Problem> {
    const result = this.checkListTemplateDefaultService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCheckListTemplateDefault,
  ): Promise<CheckListTemplateDefault | Problem> {
    const result = this.checkListTemplateDefaultService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.checkListTemplateDefaultService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

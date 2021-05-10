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
import { CheckStatusTemplateService } from './check-status-template.service';
import { CheckStatusTemplate } from './entities/check-status-template.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCheckStatusTemplate } from './models/req.check-status-template.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('CheckStatusTemplate')
@Controller('check-status-template')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CheckStatusTemplateController {
  constructor(
    private readonly checkStatusTemplateService: CheckStatusTemplateService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.checkStatusTemplateService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.checkStatusTemplateService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqCheckStatusTemplate,
  ): Promise<CheckStatusTemplate | Problem> {
    const result = this.checkStatusTemplateService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCheckStatusTemplate,
  ): Promise<CheckStatusTemplate | Problem> {
    const result = this.checkStatusTemplateService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.checkStatusTemplateService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

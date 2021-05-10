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
import { CleanStatusTemplateService } from './clean-status-template.service';
import { CleanStatusTemplate } from './entities/clean-status-template.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCleanStatusTemplate } from './models/req.clean-status-template.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('CleanStatusTemplate')
@Controller('clean-status-template')
// Note:: Need to add all controller to check permission
//@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CleanStatusTemplateController {
  constructor(
    private readonly cleanStatusTemplateService: CleanStatusTemplateService,
  ) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.cleanStatusTemplateService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.cleanStatusTemplateService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqCleanStatusTemplate,
  ): Promise<CleanStatusTemplate | Problem> {
    const result = this.cleanStatusTemplateService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCleanStatusTemplate,
  ): Promise<CleanStatusTemplate | Problem> {
    const result = this.cleanStatusTemplateService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.cleanStatusTemplateService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

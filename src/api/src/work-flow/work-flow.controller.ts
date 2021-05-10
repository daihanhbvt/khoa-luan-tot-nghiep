import {Controller, Get, Post, Body, Delete, Param, Put, Query, Req, UseInterceptors,} from '@nestjs/common';
import { WorkFlowService } from './work-flow.service';
import { WorkFlow } from './entities/work-flow.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { ReqWorkFlow } from './models/req.work-flow.model';

@ApiTags('WorkFlow')
@Controller('work-flow')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class WorkFlowController {
  constructor(private readonly workFlowService: WorkFlowService) { }

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.workFlowService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.workFlowService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqWorkFlow,
  ): Promise<WorkFlow | Problem> {
    const result = this.workFlowService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqWorkFlow,
  ): Promise<WorkFlow | Problem> {
    const result = this.workFlowService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.workFlowService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

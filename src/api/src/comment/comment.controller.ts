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
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { ReqComment } from './models/req.comment.model';

@ApiTags('Comment')
@Controller('comment')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.commentService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.commentService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqComment,
  ): Promise<Comment | Problem> {
    const result = this.commentService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqComment,
  ): Promise<Comment | Problem> {
    const result = this.commentService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.commentService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

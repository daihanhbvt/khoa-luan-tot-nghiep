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
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Problem } from 'src/common';
import { Pagination } from 'src/base-model/paging.model';
import { ReqCategory } from './../category/models/req.category.model';
import { ApiTags, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@ApiTags('Category')
@Controller('category')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.categoryService.findAll(
      req,
      new Pagination(query),
    );
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get(':id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.categoryService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post()
  async create(
    @Req() req: Request,
    @Body() body: ReqCategory,
  ): Promise<Category | Problem> {
    const result = this.categoryService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqCategory,
  ): Promise<Category | Problem> {
    const result = this.categoryService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.categoryService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

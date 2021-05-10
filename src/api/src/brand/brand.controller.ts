import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { Problem } from 'src/common';
import { ReqBrand } from './models/req.brand.model';
import { ApiTags, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';
import { Pagination } from 'src/base-model/paging.model';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Request } from 'express';

@ApiTags('Brand')
@Controller('brand')
// Note:: Need to add all controller to check permission
@ApiHeader({ name: 'site_id', required: true })
@ApiBearerAuth()
@UseInterceptors(AuthorizationMiddleware)
@Controller('/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('all')
  async all(@Req() req: Request, @Query() query: Pagination) {
    const result = await this.brandService.findAll(req, new Pagination(query));
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Get('get/:id')
  async get(@Req() req: Request, @Param('id') id: string) {
    const result = await this.brandService.get(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Post('create')
  async create(
    @Req() req: Request,
    @Body() body: ReqBrand,
  ): Promise<Brand | Problem> {
    const result = this.brandService.create(req, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body: ReqBrand,
  ): Promise<Brand | Problem> {
    const result = this.brandService.update(req, id, body);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }

  @Delete('delete/:id')
  async delete(@Req() req: Request, @Param('id') id: string): Promise<any> {
    const result = this.brandService.delete(req, id);
    return result instanceof Problem ? Problem.HttpException(result) : result;
  }
}

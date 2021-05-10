import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TablePropertiesController } from './table-properties.controller';
import { TablePropertiesService } from './table-properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableProperties } from './entities/table-properties.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TableProperties])],
  controllers: [TablePropertiesController],
  providers: [TablePropertiesService],
})
export class TablePropertiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(TablePropertiesController);
  }
}

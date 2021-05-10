import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RoomTypeTemplateController } from './room-type-template.controller';
import { RoomTypeTemplateService } from './room-type-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeTemplate } from './entities/room-type-template.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RoomTypeTemplate])],
  controllers: [RoomTypeTemplateController],
  providers: [RoomTypeTemplateService],
})
export class RoomTypeTemplateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(RoomTypeTemplateController);
  }
}

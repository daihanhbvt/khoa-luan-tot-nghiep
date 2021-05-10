import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RoomStatusTemplateController } from './room-status-template.controller';
import { RoomStatusTemplateService } from './room-status-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatusTemplate } from './entities/room-status-template.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStatusTemplate])],
  controllers: [RoomStatusTemplateController],
  providers: [RoomStatusTemplateService],
})
export class RoomStatusTemplateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(RoomStatusTemplateController);
  }
}

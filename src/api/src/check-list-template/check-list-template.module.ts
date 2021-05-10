import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListTemplateController } from './check-list-template.controller';
import { CheckListTemplateService } from './check-list-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListTemplate } from './entities/check-list-template.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Room } from 'src/room/entities/room.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { Floors } from 'src/floors/entities/floors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckListTemplate, Room, RoomType, Floors]),
  ],
  controllers: [CheckListTemplateController],
  providers: [CheckListTemplateService],
})
export class CheckListTemplateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckListTemplateController);
  }
}

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Init } from './entities/init.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { RoomStatusTemplate } from 'src/room-status-template/entities/room-status-template.entity';
import { CheckStatusTemplate } from 'src/check-status-template/entities/check-status-template.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';
import { Clean } from 'src/clean/entities/clean.entity';
import { Booked } from 'src/booked/entities/booked.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';
import { Room } from 'src/room/entities/room.entity';
import { Floors } from 'src/floors/entities/floors.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { RoomTypeTemplate } from 'src/room-type-template/entities/room-type-template.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { CleanStatusTemplate } from 'src/clean-status-template/entities/clean-status-template.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { PublicArea } from 'src/public-area/entities/public-area.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomStatusTemplate,
      RoomStatus,
      RoomStatusTemplate,
      CheckStatusTemplate,
      CheckStatus,
      CleanStatusTemplate,
      CleanStatus,
      RoomTypeTemplate,
      RoomType,
      Hotel,
      Floors,
      Room,
      Assignment,
      Customer,
      Booked,
      Clean,
      CheckListTemplate,
      CheckList,
      PublicArea,
    ]),
  ],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(InitController);
  }
}

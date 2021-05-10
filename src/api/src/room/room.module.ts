import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Floors } from 'src/floors/entities/floors.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Floors,
      RoomType,
      RoomStatus,
      CleanStatus,
      CheckStatus,
      Customer,
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(RoomController);
  }
}

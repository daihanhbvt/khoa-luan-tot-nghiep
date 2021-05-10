import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { BookedController } from './booked.controller';
import { BookedService } from './booked.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booked } from './entities/booked.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Room } from 'src/room/entities/room.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { RoomStatus } from 'src/room-status/entities/room-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booked, Room, Customer, RoomStatus])],
  controllers: [BookedController],
  providers: [BookedService],
})
export class BookedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(BookedController);
  }
}

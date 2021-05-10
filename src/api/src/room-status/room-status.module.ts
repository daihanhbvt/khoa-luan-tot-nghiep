import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RoomStatusController } from './room-status.controller';
import { RoomStatusService } from './room-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomStatus } from './entities/room-status.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RoomStatus])],
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(RoomStatusController);
  }
}

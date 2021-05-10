import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RoomTypeController } from './room-type.controller';
import { RoomTypeService } from './room-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(RoomTypeController);
  }
}

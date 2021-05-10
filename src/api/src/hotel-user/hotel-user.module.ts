import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HotelUserController } from './hotel-user.controller';
import { HotelUserService } from './hotel-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelUser } from './entities/hotel-user.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([HotelUser])],
  controllers: [HotelUserController],
  providers: [HotelUserService],
})
export class HotelUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(HotelUserController);
  }
}

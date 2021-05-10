import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { FloorsController } from './floors.controller';
import { FloorsService } from './floors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Floors } from './entities/floors.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Floors, Hotel])],
  controllers: [FloorsController],
  providers: [FloorsService],
})
export class FloorsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(FloorsController);
  }
}

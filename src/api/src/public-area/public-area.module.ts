import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PublicAreaController } from './public-area.controller';
import { PublicAreaService } from './public-area.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicArea } from './entities/public-area.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { Floors } from 'src/floors/entities/floors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicArea, CleanStatus, CheckStatus, Floors]),
  ],
  controllers: [PublicAreaController],
  providers: [PublicAreaService],
})
export class PublicAreaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(PublicAreaController);
  }
}

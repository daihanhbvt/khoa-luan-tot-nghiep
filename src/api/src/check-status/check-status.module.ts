import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckStatusController } from './check-status.controller';
import { CheckStatusService } from './check-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckStatus } from './entities/check-status.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CheckStatus])],
  controllers: [CheckStatusController],
  providers: [CheckStatusService],
})
export class CheckStatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CheckStatusController);
  }
}

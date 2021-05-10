import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CleanStatusController } from './clean-status.controller';
import { CleanStatusService } from './clean-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleanStatus } from './entities/clean-status.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CleanStatus])],
  controllers: [CleanStatusController],
  providers: [CleanStatusService],
})
export class CleanStatusModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CleanStatusController);
  }
}

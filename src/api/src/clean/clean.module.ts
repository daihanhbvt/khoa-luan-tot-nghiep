import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CleanController } from './clean.controller';
import { CleanService } from './clean.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clean } from './entities/clean.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CleanStatus } from 'src/clean-status/entities/clean-status.entity';
import { CheckStatus } from 'src/check-status/entities/check-status.entity';
import { Assignment } from 'src/assignment/entities/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clean, CleanStatus, CheckStatus, Assignment]),
  ],
  controllers: [CleanController],
  providers: [CleanService],
})
export class CleanModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CleanController);
  }
}

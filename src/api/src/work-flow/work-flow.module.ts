import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { WorkFlowController } from './work-flow.controller';
import { WorkFlowService } from './work-flow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkFlow } from './entities/work-flow.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([WorkFlow])],
  controllers: [WorkFlowController],
  providers: [WorkFlowService],
})
export class WorkFlowModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(WorkFlowController);
  }
}

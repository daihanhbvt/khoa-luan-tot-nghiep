import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckStatusTemplateController } from './check-status-template.controller';
import { CheckStatusTemplateService } from './check-status-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckStatusTemplate } from './entities/check-status-template.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CheckStatusTemplate])],
  controllers: [CheckStatusTemplateController],
  providers: [CheckStatusTemplateService],
})
export class CheckStatusTemplateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckStatusTemplateController);
  }
}

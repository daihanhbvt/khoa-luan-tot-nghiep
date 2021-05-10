import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CleanStatusTemplateController } from './clean-status-template.controller';
import { CleanStatusTemplateService } from './clean-status-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CleanStatusTemplate } from './entities/clean-status-template.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CleanStatusTemplate])],
  controllers: [CleanStatusTemplateController],
  providers: [CleanStatusTemplateService],
})
export class CleanStatusTemplateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CleanStatusTemplateController);
  }
}

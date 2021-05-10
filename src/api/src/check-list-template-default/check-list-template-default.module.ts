import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListTemplateDefaultController } from './check-list-template-default.controller';
import { CheckListTemplateDefaultService } from './check-list-template-default.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListTemplateDefault } from './entities/check-list-template-default.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CheckListTemplateDefault])],
  controllers: [CheckListTemplateDefaultController],
  providers: [CheckListTemplateDefaultService],
})
export class CheckListTemplateDefaultModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckListTemplateDefaultController);
  }
}

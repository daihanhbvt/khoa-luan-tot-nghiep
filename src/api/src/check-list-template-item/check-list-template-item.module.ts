import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListTemplateItemController } from './check-list-template-item.controller';
import { CheckListTemplateItemService } from './check-list-template-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListTemplateItem } from './entities/check-list-template-item.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckListTemplateItem, CheckListTemplate]),
  ],
  controllers: [CheckListTemplateItemController],
  providers: [CheckListTemplateItemService],
})
export class CheckListTemplateItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckListTemplateItemController);
  }
}

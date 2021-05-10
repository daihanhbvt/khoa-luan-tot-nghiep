import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListTemplateDefaultItemController } from './check-list-template-default-item.controller';
import { CheckListTemplateDefaultItemService } from './check-list-template-default-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListTemplateDefaultItem } from './entities/check-list-template-default-item.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CheckListTemplateDefault } from 'src/check-list-template-default/entities/check-list-template-default.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckListTemplateDefaultItem,
      CheckListTemplateDefault,
    ]),
  ],
  controllers: [CheckListTemplateDefaultItemController],
  providers: [CheckListTemplateDefaultItemService],
})
export class CheckListTemplateDefaultItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckListTemplateDefaultItemController);
  }
}

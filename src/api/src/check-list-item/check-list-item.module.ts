import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListItemController } from './check-list-item.controller';
import { CheckListItemService } from './check-list-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListItem } from './entities/check-list-item.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CheckList } from 'src/check-list/entities/check-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckListItem, CheckList])],
  controllers: [CheckListItemController],
  providers: [CheckListItemService],
})
export class CheckListItemModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CheckListItemController);
  }
}

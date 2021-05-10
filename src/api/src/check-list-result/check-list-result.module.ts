import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListResultController } from './check-list-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckListResult } from './entities/check-list-result.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { CheckListResultService } from './check-list-result.service';
import { CheckList } from 'src/check-list/entities/check-list.entity';
import { CheckListItem } from 'src/check-list-item/entities/check-list-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckListResult, CheckList, CheckListItem]),
  ],
  controllers: [CheckListResultController],
  providers: [CheckListResultService],
})
export class CheckListResultModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(CheckListResultController);
  }
}

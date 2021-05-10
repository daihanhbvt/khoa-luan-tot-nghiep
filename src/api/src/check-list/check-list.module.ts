import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CheckListController } from './check-list.controller';
import { CheckListService } from './check-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckList } from './entities/check-list.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { Clean } from 'src/clean/entities/clean.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckList, Clean, CheckListTemplate])],
  controllers: [CheckListController],
  providers: [CheckListService],
})
export class CheckListModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CheckListController);
  }
}

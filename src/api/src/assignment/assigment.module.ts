import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
import { CheckListTemplate } from 'src/check-list-template/entities/check-list-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, PublicArea, Room, CheckListTemplate])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(AssignmentController);
  }
}

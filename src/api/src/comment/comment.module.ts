import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthorizationMiddleware } from 'src/middleware/auth.middleware';
import { PublicArea } from 'src/public-area/entities/public-area.entity';
import { Room } from 'src/room/entities/room.entity';
import { Clean } from 'src/clean/entities/clean.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,Clean, PublicArea, Room])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes(CommentController);
  }
}

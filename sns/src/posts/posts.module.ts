import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  imports: [
    // 모델에 해당되는 repository를 주입할 때 forFeature()를 사용
    TypeOrmModule.forFeature([
      PostsModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}

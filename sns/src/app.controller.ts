import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('post')
  getPost(): Post {
    return {
      author: 'ham._.ji',
      title: '함지현',
      content: '안녕하세요. 함지현입니다.',
      likeCount: 100,
      commentCount: 3,
    };
  }
}

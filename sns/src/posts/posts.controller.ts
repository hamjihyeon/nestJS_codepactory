import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts : PostModel[] = [
  {
    id: 1,
    author: 'ham._.ji',
    title: '함지현',
    content: '안녕하세요. 함지현입니다.',
    likeCount: 100,
    commentCount: 3,
  },
  {
    id: 2,
    author: 'jihyeon',
    title: '지현',
    content: '안녕하세요. 지현입니다.',
    likeCount: 100,
    commentCount: 3,
  },
  {
    id: 3,
    author: 'hamji',
    title: '함지',
    content: '안녕하세요. 함지입니다.',
    likeCount: 100,
    commentCount: 3,
  },
];

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 posts를 다 가져온다.
  @Get()
  getPosts() {
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당되는 post를 가져온다.
  //    ex) id = 1인 경우 id가 1인 post를 가져온다.
  @Get(':id')
  getPost(@Param('id') id: string) {
    return posts.find((post)=> post.id === +id);
  }

  // 3) POST /posts
  //    post를 생성한다.

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다.

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.

}

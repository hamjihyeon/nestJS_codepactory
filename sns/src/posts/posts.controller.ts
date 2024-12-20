import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
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
    const post = posts.find((post)=> post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  // 3) POST /posts
  //    post를 생성한다.
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    const post : PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [
      ...posts,
      post,
    ];

    return post;
  }

  // 4) Patch /posts/:id
  //    id에 해당되는 POST를 변경한다.
  @Patch(':id')
  patchPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    // 입력한 값들만 변경
    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost); 

    return post;
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다.

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

export interface PostModel {
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

@Injectable()
export class PostsService {
  constructor(
    // 모델에 해당이되는 repository를 주입하고싶을 때 사용
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}
  
    async getAllPosts() {
      // 특정 조건에 맞는 모든 데이터 반환 
      return this.postsRepository.find();
    }

    async getPostById(id: number) {
         const post = await this.postsRepository.findOne({
          where: {
            id,
          },
        });

        if (!post) {
          throw new NotFoundException();
        }

        return post;
    }

    async createPost(authorId: number, title: string, content: string) {
      // 1. create -> 저장할 객체를 생성
      // 2. save -> 객체를 저장(create 매서드에서 생성한 객체로)

      const post = this.postsRepository.create({
        author: {
          id: authorId, 
        },
        title,
        content,
        likeCount: 0,
        commentCount: 0,
      });
      
      const newPost = await this.postsRepository.save(post);

      return newPost;
    }

    async updatePost(postID: number, title?: string, content?: string) { 
      // save의 기준
      // 1. 만약에 데이터가 존재하지 않는다면 (id 기준) 새로 생성
      // 2. 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트

      const post = await this.postsRepository.findOne({
        where: {
          id: postID,
        }
      })

        if (!post) {
        throw new NotFoundException();
        }

        if (title) {
        post.title = title;
        }

        if (content) {
        post.content = content;
        }

        const newPost = await this.postsRepository.save(post);

        return newPost;
    }

    async deletePost(postID: number) {
      const post = await this.postsRepository.findOne({
        where: {
          id: postID,
        }
      });

      if (!post) {
        throw new NotFoundException();
      }
      
      await this.postsRepository.delete(postID);

      return postID;
    }   
}

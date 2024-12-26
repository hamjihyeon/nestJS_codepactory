import { Injectable, NotFoundException } from '@nestjs/common';

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
    getAllPosts() {
        return posts;
    }

    getPostById(id: number) {
        const post = posts.find((post)=> post.id === +id);

        if (!post) {
        throw new NotFoundException();
        }

        return post;
    }

    createPost(author: string, title: string, content: string) {
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

    updatePost(postID: number, author?: string, title?: string, content?: string) { 
        const post = posts.find((post) => post.id === postID);

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

        posts = posts.map(prevPost => prevPost.id === postID ? post : prevPost); 

        return post;
    }

    deletePost(postID: number) {
        const post = posts.find((post)=> post.id === postID);

        if (!post) {
        throw new NotFoundException();
        }

        posts = posts.filter(post => post.id !== postID);

        return postID;
    }   
}

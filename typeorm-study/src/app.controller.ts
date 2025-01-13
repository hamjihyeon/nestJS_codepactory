import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Between, Equal, ILike, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,

    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,

  ) {}

  @Post('users')
   async postUser() {
      for(let i = 0; i < 100; i++) {
        await this.userRepository.save({
          email: `user-${i}@gmail.com`,
        });
      }
   }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약에 select를 정의하지 않으면
      // select를 정의하면 정의된 프로퍼티들만 가져오게된다. 
      // select:{
      //   id: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   version: true,
      //   profile:{
      //     id: true,
      //   },
      // },
      // 필터링할 조건을 입력하게된다.
      where:{
        // 아닌경우 가져오기
        // id: Not(1),
        // 적은경우 가져오기
        // id: LessThan(30),
        // 적은경우 or 같은경우
        // id: LessThanOrEqual(30),
        // 많은경우
        // id: MoreThan(30),
        // 많은경우 or 같은경우
        // id: MoreThanOrEqual(30),
        // 같은경우
        // id: Equal(30),
        // 유사값
        // email: Like('%GMAIL%'),
        // 대문자 소문자 구분안하는 유사값
        // email: ILike('%GMAIL%'),
        // 사이값
        // id: Between(10, 15),
        // 해당되는 여러개의 값
        // id: In([1, 3, 5, 7, 99 ]),
        // id가 null인 경우 가져오기 
        id: IsNull(), 
      },
      // 관계를 가져오는 법
      // relations:{
      //    profile: true,
      // },
      // 오름차순 내림차순
      // ASC    DESC
      // order:{
      //   id: 'DESC',
      // }, 
      // 처음 몇개를 제외할지
      // skip: 0,
      // 몇개를 가져올지
      // take: 1, 
    });
  }

  @Patch('users/:id')
  async patchUser(
    @Param('id') id: string,
  ) {
    const user = await  this.userRepository.findOne({
      where: {
        id: parseInt(id),
      }
    });
    
    return this.userRepository.save({
      ...user,
      email: user.email + '0',
     });
  }

  @Delete('user/profile/:id')
  async deleteProfile(
    @Param('id') id: string,
  ) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@gmail.com',
      profile: {
        profileImage: 'asdf.jpeg',
      }
    });

    // const profile = await this.profileRepository.save({
    //   profileImage: 'asdf.jpeg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'asdf@gmail.com',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostAndTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });

    const post2 = await this.postRepository.save({
      title: 'programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });

    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}

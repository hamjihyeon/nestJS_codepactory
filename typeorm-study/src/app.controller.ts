import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { ProfileModel } from './entity/profile.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,

    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

  ) {}

  @Post('users')
   postUser() {
    return this.userRepository.save({});
   }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
      },
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
     });
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@gmail.com',
    });

    const profile = await this.profileRepository.save({
      profileImage: 'asdf.jpeg',
      user,
    });

    return user;
  }
}

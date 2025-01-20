import { Injectable } from '@nestjs/common';
import { UsersModel } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersModel)
        private readonly usersRepository: Repository<UsersModel>,
    ) {}

    async createUser(nickname: string, email: string, password: string) {
        const user = this.usersRepository.create({
            nickname,
            email,
            password,
        });

        const newUser = await this.usersRepository.save(user);

        return newUser;
    }

    async getAllUsers() {
        return this.usersRepository.find();
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { x } from 'joi';
import { CreateUserRequestDto } from './dto/create.user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    return await this.usersRepository.saveUser(createUserRequestDto);
  }

  async readUserById(id: number, select = false) {
    const user = await this.usersRepository.findById(id, select);

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async readUserByEmail(email: string, select = false) {
    const user = await this.usersRepository.findByEmail(email, select);

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async deleteUserById(id: number) {
    await this.usersRepository.deleteById(id);
  }
}

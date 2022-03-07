import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequestDto } from './dto/create.user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    return await this.userRepository.saveUser(createUserRequestDto);
  }

  async readUserById(id: number, select = false) {
    const user = await this.userRepository.findById(id, select);

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async readUserByEmail(email: string, select = false) {
    const user = await this.userRepository.findByEmail(email, select);

    if (!user) throw new NotFoundException('There is no matching information.');

    return user;
  }

  async deleteUserById(id: number) {
    await this.readUserById(id);

    await this.userRepository.deleteById(id);
  }
}

import { EntityRepository, Repository } from 'typeorm';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserRequestDto } from './dto/create.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findById(id: number, select: boolean) {
    return await this.createQueryBuilder('user')
      .addSelect(select ? 'user.password' : '')
      .addSelect(select ? 'user.refreshToken' : '')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string, select: boolean) {
    return await this.createQueryBuilder('user')
      .addSelect(select ? 'user.password' : '')
      .addSelect(select ? 'user.refreshToken' : '')
      .where('user.email = :email', { email })
      .getOne();
  }

  async deleteById(id: number) {
    return await this.softDelete(id);
  }

  async saveUser(createUserRequestDto: CreateUserRequestDto) {
    try {
      const user = this.create(createUserRequestDto);
      return await this.save(user);
    } catch (error: any) {
      if (error.errno === 1062) {
        throw new ForbiddenException('The email is duplicated.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

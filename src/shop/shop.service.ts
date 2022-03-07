import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { CreateShopRequestDto } from './dto/create.shop.dto';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopRepository)
    private shopRepository: ShopRepository,
  ) {}

  async createShop(createShopRequestDto: CreateShopRequestDto, user: User) {
    return await this.shopRepository.saveShop(createShopRequestDto, user);
  }

  async readShops(query: string, offset: number) {
    return await this.shopRepository.findAll(query, offset);
  }

  async readShop(id: number) {
    return await this.shopRepository.findById(id);
  }
}

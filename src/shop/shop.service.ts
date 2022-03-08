import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async readShops(query: string, pagingIndex: number, pagingSize: number) {
    if (pagingSize > 20) pagingSize = 20;
    return await this.shopRepository.findAll(query, pagingIndex, pagingSize);
  }

  async readShop(id: number) {
    const shop = await this.shopRepository.findById(id);

    if (!shop) throw new NotFoundException('There is no matching information.');

    return shop;
  }

  async validateShop(id: number, user: User) {
    const shop = await this.readShop(id);

    if (shop.User.id !== user.id)
      throw new UnauthorizedException("You can't access it.");

    return shop;
  }
}

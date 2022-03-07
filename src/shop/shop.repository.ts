import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateShopRequestDto } from './dto/create.shop.dto';
import { Shop } from './shop.entity';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  async saveShop(createShopRequestDto: CreateShopRequestDto, user: User) {
    const shop = this.create(createShopRequestDto);
    shop.User = user;
    return await this.save(shop);
  }

  async findAll(query = '', pagingIndex: number, pagingSize: number) {
    return await this.createQueryBuilder('shop')
      .where('shop.name like :name', { name: `%${query}%` })
      .orderBy('shop.name')
      .addOrderBy('shop.id')
      .skip(pagingSize * (pagingIndex - 1))
      .take(pagingSize)
      .getMany();
  }

  async findById(id: number) {
    return await this.createQueryBuilder('shop')
      .leftJoinAndSelect('shop.User', 'user')
      .where('shop.id = :id', { id })
      .getOne();
  }
}

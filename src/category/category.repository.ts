import { Shop } from 'src/shop/shop.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryRequestDto } from './dto/category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async saveProduct(categoryRequestDto: CategoryRequestDto, shop: Shop) {
    const category = this.create(categoryRequestDto);
    category.Shop = shop;
    return await this.save(category);
  }

  async findAll(shopId: number) {
    return await this.createQueryBuilder('categories')
      .where('categories.shop_id = :shop_id', { shop_id: shopId })
      .getMany();
  }

  async findById(id: number, shopId: number) {
    return await this.createQueryBuilder('categories')
      .where('categories.id = :id', { id })
      .andWhere('categories.shop_id = :shop_id', { shop_id: shopId })
      .getOne();
  }
}

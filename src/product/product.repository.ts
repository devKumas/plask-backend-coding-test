import { Category } from 'src/category/category.entity';
import { Shop } from 'src/shop/shop.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductRequestDto } from './dto/create.product.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async saveProduct(
    createProductRequestDto: CreateProductRequestDto,
    shop: Shop,
    category: Category,
  ) {
    const product = this.create(createProductRequestDto);
    product.Shop = shop;
    product.Category = category;
    product.rating = Math.floor(Math.random() * 50) / 10;
    return await this.save(product);
  }

  async findAll(
    shopId: number,
    pagingIndex: number,
    pagingSize: number,
    sort: string,
    categoryId: number,
  ) {
    console.log('-----------', categoryId);
    let orderByColumn = 'product.price';
    let orderBySort: 'ASC' | 'DESC' = 'ASC';
    switch (sort) {
      case 'price_desc':
        orderByColumn = 'product.price';
        orderBySort = 'DESC';
        break;
      case 'date':
        orderByColumn = 'product.createdAt';
        break;
      case 'rating':
        orderByColumn = 'product.rating';
        orderBySort = 'DESC';
        break;
    }
    const product = this.createQueryBuilder('product').where(
      'product.shop_id = :shop_id',
      { shop_id: shopId },
    );

    if (categoryId)
      product.andWhere('product.category_id = :category_id', {
        category_id: categoryId,
      });

    return product
      .orderBy(orderByColumn, orderBySort)
      .skip(pagingSize * (pagingIndex - 1))
      .take(pagingSize)
      .getMany();
  }

  async findById(id: number, shopId: number) {
    return await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.Shop', 'shop')
      .leftJoinAndSelect('shop.User', 'user')
      .leftJoinAndSelect('product.Category', 'category')
      .where('product.id = :id', { id })
      .andWhere('shop.id = :shopId', { shopId })
      .getOne();
  }

  async deleteById(id: number) {
    return await this.softDelete(id);
  }
}

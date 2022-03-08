import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ShopService } from 'src/shop/shop.service';
import { User } from 'src/user/user.entity';
import { CreateProductRequestDto } from './dto/create.product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    private shopService: ShopService,
    private categoryService: CategoryService,
  ) {}

  async createProduct(
    createProductRequestDto: CreateProductRequestDto,
    shopId: number,
    user: User,
  ) {
    const shop = await this.shopService.validateShop(shopId, user);

    const { category: categoryId } = createProductRequestDto;

    let category;
    if (categoryId)
      category = await this.categoryService.readCategory(categoryId, shopId);

    return this.productRepository.saveProduct(
      createProductRequestDto,
      shop,
      category,
    );
  }

  async readProducts(
    shopId: number,
    pagingIndex: number,
    pagingSize: number,
    sort: string,
    categoryId: number,
  ) {
    if (pagingSize > 40) pagingSize = 40;
    return await this.productRepository.findAll(
      shopId,
      pagingIndex,
      pagingSize,
      sort,
      categoryId,
    );
  }

  async readProduct(id: number, shopId: number) {
    const product = await this.productRepository.findById(id, shopId);

    if (!product)
      throw new NotFoundException('There is no matching information.');

    return product;
  }

  async deleteProduct(id: number, shopId: number, user: User) {
    await this.shopService.validateShop(shopId, user);

    await this.readProduct(id, shopId);

    await this.productRepository.deleteById(id);
  }
}

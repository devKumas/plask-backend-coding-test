import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async createProduct(
    createProductRequestDto: CreateProductRequestDto,
    shopId: number,
    user: User,
  ) {
    const shop = await this.shopService.validateShop(shopId, user);

    return this.productRepository.saveProduct(createProductRequestDto, shop);
  }

  async readProducts(
    shopId: number,
    pagingIndex: number,
    pagingSize: number,
    sort: string,
  ) {
    return await this.productRepository.findAll(
      shopId,
      pagingIndex,
      pagingSize,
      sort,
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

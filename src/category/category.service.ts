import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from 'src/shop/shop.service';
import { User } from 'src/user/user.entity';
import { CategoryRepository } from './category.repository';
import { CategoryRequestDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private shopService: ShopService,
  ) {}

  async createCategory(
    categoryRequestDto: CategoryRequestDto,
    shopId: number,
    user: User,
  ) {
    const shop = await this.shopService.validateShop(shopId, user);

    return this.categoryRepository.saveProduct(categoryRequestDto, shop);
  }

  async readCategories(shopId: number) {
    return this.categoryRepository.findAll(shopId);
  }

  async readCategory(id: number, shopId: number) {
    const category = await this.categoryRepository.findById(id, shopId);
    console.log('--------------------', category);

    if (!category)
      throw new NotFoundException('There is no matching information.');

    return category;
  }
}

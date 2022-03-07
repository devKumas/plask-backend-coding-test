import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), ShopModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

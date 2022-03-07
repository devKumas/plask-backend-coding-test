import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}

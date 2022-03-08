import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { CoreEntityAndDelete } from 'src/core.entity';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Shop } from 'src/shop/shop.entity';

@Entity({ name: 'categories' })
export class Category extends CoreEntityAndDelete {
  @ApiProperty({
    example: '남성',
    description: '카테고리명',
  })
  @Length(1, 20)
  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @ManyToOne(() => Shop, (shop) => shop.Categories)
  @JoinColumn({ name: 'shop_id' })
  Shop: Shop;

  @OneToMany(() => Product, (product) => product.Shop)
  Products: Product[];
}

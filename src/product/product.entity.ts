import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Shop } from 'src/shop/shop.entity';
import { CoreEntityAndDelete } from 'src/core.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Length } from 'class-validator';

@Entity({ name: 'products' })
export class Product extends CoreEntityAndDelete {
  @ApiProperty({
    example: '캐보드 여아 여름 유니콘 원피스 2가지 옵션',
    description: '상품 이름',
  })
  @Length(1, 50)
  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @ApiProperty({
    example: '여름에 입기 딱 좋은 원피스',
    description: '상품 설명',
  })
  @Length(1, 100)
  @Column('varchar', { name: 'description', length: 100 })
  description: string;

  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '상품 대표 이미지',
  })
  @Length(1, 100)
  @Column('varchar', { name: 'image', length: 100 })
  image: string;

  @ApiProperty({
    example: '30000',
    description: '상품 원가',
  })
  @IsNumber()
  @Column('decimal', { name: 'cost' })
  cost: number;

  @ApiProperty({
    example: '15000',
    description: '상품 할인가',
  })
  @IsNumber()
  @Column('decimal', { name: 'price' })
  price: number;

  @Column('double', { name: 'rating' })
  rating: number;

  @ManyToOne(() => Shop, (shop) => shop.Products)
  @JoinColumn({ name: 'shop_id' })
  Shop: Shop;
}

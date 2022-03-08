import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { CoreEntityAndDelete } from 'src/core.entity';
import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/category.entity';

@Entity({ name: 'shops' })
export class Shop extends CoreEntityAndDelete {
  @ApiProperty({
    example: '최저가 쇼핑',
    description: '쇼핑몰 상호',
  })
  @Length(1, 10)
  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '쇼핑몰 로고',
  })
  @Length(1, 100)
  @Column('varchar', { name: 'logo', length: 100 })
  logo: string;

  @ManyToOne(() => User, (user) => user.Shops)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @OneToMany(() => Product, (product) => product.Shop)
  Products: Product[];

  @OneToMany(() => Category, (category) => category.Shop)
  Categories: Category[];
}

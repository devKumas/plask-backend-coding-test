import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from 'src/shop/shop.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'description', length: 100 })
  description: string;

  @Column('varchar', { name: 'image', length: 100 })
  image: string;

  @Column('decimal', { name: 'cost' })
  cost: number;

  @Column('decimal', { name: 'price' })
  price: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.Products)
  @JoinColumn({ name: 'shop_id' })
  Shop: Shop;
}

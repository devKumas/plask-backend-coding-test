import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 10 })
  name: string;

  @Column('varchar', { name: 'logo', length: 100 })
  logo: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.Shops)
  @JoinColumn({ name: 'user_id' })
  User: User;

  @OneToMany(() => Product, (product) => product.Shop)
  Products: Product[];
}

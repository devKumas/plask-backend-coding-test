import { PickType } from '@nestjs/swagger';
import { Product } from '../product.entity';

export class CreateProductRequestDto extends PickType(Product, [
  'name',
  'description',
  'image',
  'cost',
  'price',
] as const) {}

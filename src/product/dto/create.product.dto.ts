import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Product } from '../product.entity';

export class CreateProductRequestDto extends PickType(Product, [
  'name',
  'description',
  'image',
  'cost',
  'price',
] as const) {
  @ApiProperty({
    example: '1',
    description: '카테고리 id',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  category: number | null;
}

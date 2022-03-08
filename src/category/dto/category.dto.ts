import { PickType } from '@nestjs/swagger';
import { Category } from '../category.entity';

export class CategoryRequestDto extends PickType(Category, ['name'] as const) {}

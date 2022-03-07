import { PickType } from '@nestjs/swagger';
import { Shop } from '../shop.entity';

export class ReadShopsRequestDto extends PickType(Shop, [
  'id',
  'name',
  'logo',
] as const) {}

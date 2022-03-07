import { PickType } from '@nestjs/swagger';
import { Shop } from '../shop.entity';

export class CreateShopRequestDto extends PickType(Shop, [
  'name',
  'logo',
] as const) {}

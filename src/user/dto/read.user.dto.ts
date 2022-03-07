import { PickType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class ReadUserResponseDto extends PickType(User, [
  'id',
  'email',
  'name',
  'phone',
] as const) {}

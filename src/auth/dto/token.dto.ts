import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class TokenRequestDto extends PickType(User, [
  'refreshToken',
] as const) {}

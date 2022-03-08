import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class LoginRequestDto extends PickType(User, ['email'] as const) {
  @ApiProperty({
    example: 'password1#',
    description: '비밀번호',
  })
  password: string;
}

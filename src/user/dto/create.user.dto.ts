import { ApiProperty, PickType } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { User } from '../user.entity';

export class CreateUserRequestDto extends PickType(User, [
  'email',
  'name',
  'phone',
] as const) {
  @ApiProperty({
    example: 'password1#',
    description: '비밀번호',
  })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=\-])(?=.*[0-9]).{8,20}$/, {
    message:
      'The password must be at least 8 digits long with three or more types of characters.',
  })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ReadUserResponseDto {
  @ApiProperty({
    example: '1',
    description: '고유 아이디',
  })
  id: number;

  @ApiProperty({
    example: 'user@domain.com',
    description: '이메일',
  })
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  name: string;

  @ApiProperty({
    example: '010-0000-0000',
    description: '전화번호',
  })
  phone: string;
}

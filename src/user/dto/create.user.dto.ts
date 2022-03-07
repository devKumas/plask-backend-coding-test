import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserRequestDto {
  @Length(1, 30)
  @IsEmail()
  @ApiProperty({
    example: 'user@domain.com',
    description: '이메일',
  })
  email: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=\-])(?=.*[0-9]).{8,20}$/, {
    message:
      'The password must be at least 8 digits long with three or more types of characters.',
  })
  @ApiProperty({
    example: 'password1#',
    description: '비밀번호',
  })
  password: string;

  @Length(2, 10)
  @IsString()
  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  name: string;

  @Matches(/^\d{3}-\d{3,4}-\d{4}$/, {
    message: "It doesn't fit the phone number format.",
  })
  @ApiProperty({
    example: '010-0000-0000',
    description: '전화번호',
  })
  phone: string;
}

export class CreateUserResponseDto {
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
    example: '$2b$12$hXpTBhOI.4nLGbJFvr1le.LFVBIyXUvm2g6.JLn.E.D/gUzNsLy4G',
    description: '암호화된 비밀번호',
  })
  password: string;

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

  @ApiProperty({
    example: 'null',
    description: '재발급 토큰',
  })
  refreshToken: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: '등록일',
  })
  createdAt: string;

  @ApiProperty({
    example: '2022-01-01T00:00:00.000Z',
    description: '수정일',
  })
  updatedAt: string;

  @ApiProperty({
    example: 'null',
    description: '삭제일',
  })
  deletedAt: string;
}

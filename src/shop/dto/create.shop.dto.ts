import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateShopRequestDto {
  @Length(1, 10)
  @ApiProperty({
    example: '플라스크샵',
    description: '쇼핑몰 상호',
  })
  name: string;

  @Length(1, 100)
  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '쇼핑몰 로고',
  })
  logo: string;
}

export class CreateShopResponseDto {
  @ApiProperty({
    example: '1',
    description: '고유 아이디',
  })
  id: number;

  @Length(1, 50)
  @ApiProperty({
    example: '플라스크샵',
    description: '쇼핑몰 상호',
  })
  name: string;

  @Length(1, 100)
  @ApiProperty({
    example: 'http://localhost/img/logo.png',
    description: '쇼핑몰 로고',
  })
  logo: string;

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

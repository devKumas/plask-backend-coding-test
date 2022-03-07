import { ApiProperty } from '@nestjs/swagger';

export class ReadShopsRequestDto {
  @ApiProperty({
    example: '1',
    description: '고유 아이디',
  })
  id: number;

  @ApiProperty({
    example: '플라스크샵',
    description: '쇼핑몰 상호',
  })
  name: string;

  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '쇼핑몰 로고',
  })
  logo: string;
}

export class ReadShopRequestDto {
  @ApiProperty({
    example: 'id',
    description: '고유 아이디',
  })
  id: number;

  @ApiProperty({
    example: '플라스크샵',
    description: '쇼핑몰 상호',
  })
  name: string;

  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '쇼핑몰 로고',
  })
  logo: string;

  @ApiProperty({
    example: {},
    description: '사용자 정보',
  })
  user: object;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Length } from 'class-validator';

export class CreateProductRequestDto {
  @Length(1, 50)
  @ApiProperty({
    example: '캐보드 여아 여름 유니콘 원피스 2가지 옵션',
    description: '상품 이름',
  })
  name: string;

  @Length(1, 100)
  @ApiProperty({
    example: '여름에 입기 딱 좋은 원피스',
    description: '상품 설명',
  })
  description: string;

  @Length(1, 100)
  @ApiProperty({
    example:
      'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '상품 대표 이미지',
  })
  image: string;

  @IsNumber()
  @ApiProperty({
    example: '30000',
    description: '상품 원가',
  })
  cost: number;

  @IsNumber()
  @ApiProperty({
    example: '15000',
    description: '상품 할인가',
  })
  price: number;
}

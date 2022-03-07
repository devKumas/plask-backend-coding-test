import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    example: 'http://127.0.0.1:9000/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
    description: '이미지 경로',
  })
  location: string;
}

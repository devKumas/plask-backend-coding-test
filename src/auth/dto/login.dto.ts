import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user@domain.com',
    description: '이메일',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password1#',
    description: '비밀번호',
  })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'bearer',
    description: '인증 종류',
  })
  tokenType: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGRvbWFpbi5jb20iLCJuYW1lIjoi7ZmN6ri464-ZIiwicGhvbmUiOiIwMTAtMDAwMC0wMDAwIiwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.wkqb0kFExH6fufO5lxQK0P1ZbYBk1sn_Acz3D2TxtSE',
    description: '인증 토큰',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI5NTc0LCJleHAiOjE2NDY1MTU5NzR9.y0laz-HyxDPkV8LXxeGitO6bddcBt_vhBA8RekEIozk',
    description: '재발급 토큰',
  })
  refreshToken: string;
}

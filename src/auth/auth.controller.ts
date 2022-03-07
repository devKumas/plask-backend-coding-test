import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { GetUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { TokenRequestDto, TokenResponseDto } from './dto/token.dto';
import { JwtAuthGuard } from './auth.guard';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '로그인하여 토큰을 발급합니다.',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOkResponse({ description: '성공', type: LoginResponseDto })
  @ApiNotFoundResponse({
    description: '이메일이 잘못 되었습니다.',
  })
  @ApiUnauthorizedResponse({
    description: '비밀번호가 잘못 되었습니다.',
  })
  @Post('/login')
  login(@Body() loginRequestDto: LoginRequestDto) {
    return this.authService.login(loginRequestDto);
  }

  @ApiOperation({
    summary: '로그아웃',
    description: '저장된 Refresh Token을 삭제합니다.',
  })
  @ApiNoContentResponse({ description: '성공' })
  @ApiBearerAuth('accessToken')
  @HttpCode(204)
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@GetUser() user: User) {
    this.authService.updateRefreshToken(user);
    return;
  }

  @ApiOperation({
    summary: '토큰 재발급',
    description:
      'RefreshToken을 이용하여 AccessToken을 재발급합니다. RefreshToken의 기간이 1일 이하라면 함께 재발급 됩니다.',
  })
  @ApiBody({
    type: TokenRequestDto,
  })
  @ApiOkResponse({ description: '성공', type: TokenResponseDto })
  @ApiUnauthorizedResponse({
    description: '토큰이 잘못 되었습니다.',
  })
  @Post('/token')
  token(@Body() tokenRequestDto: TokenRequestDto) {
    return this.authService.token(tokenRequestDto);
  }
}

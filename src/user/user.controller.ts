import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateUserRequestDto } from './dto/create.user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '사용자 등록', description: '사용자를 등록합니다.' })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          id: 1,
          email: 'user@domain.com',
          password:
            '$2b$10$HjARcN8LPMeT80a5MrLkkuQt38v4pRZRBc26GhkRe0l0cQKkHQ6P.',
          name: '홍길동',
          phone: '010-0000-0000',
          refreshToken: null,
          createdAt: '2022-03-07T16:22:18.560Z',
          updatedAt: '2022-03-07T16:22:18.560Z',
          deletedAt: null,
        },
      },
    },
  })
  @ApiForbiddenResponse({ description: '중복된 이메일 주소 입니다.' })
  @Post('')
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.userService.createUser(createUserRequestDto);
  }

  @ApiOperation({
    summary: '내 정보 조회',
    description: '내 정보를 호출합니다.',
  })
  @ApiOkResponse({
    description: '로그인 정보',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: {
          id: 1,
          email: 'user@domain.com',
          name: '홍길동',
          phone: '010-0000-0000',
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @Get('')
  @UseGuards(JwtAuthGuard)
  readUser(@GetUser() user: User) {
    return this.userService.readUserById(user.id);
  }

  @ApiOperation({
    summary: '사용자 삭제',
    description: '사용자의 정보를 삭제합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUserById(user.id);
  }
}

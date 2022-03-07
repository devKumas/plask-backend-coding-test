import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create.user.dto';
import { ReadUserResponseDto } from './dto/read.user.dto';
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
  @ApiCreatedResponse({ description: '성공', type: CreateUserResponseDto })
  @ApiForbiddenResponse({ description: '중복된 이메일 주소 입니다.' })
  @Post('')
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this.userService.createUser(createUserRequestDto);
  }

  @ApiOperation({
    summary: '사용자 정보 조회',
    description: '사용자의 정보를 호출합니다.',
  })
  @ApiOkResponse({ description: '성공', type: ReadUserResponseDto })
  @ApiBearerAuth('accessToken')
  @Get('')
  @UseGuards(JwtAuthGuard)
  readUser(@GetUser() user: User) {
    return this.userService.readUserById(user.id);
  }

  @ApiOperation({
    summary: '사용자 삭제',
    description: '사용자의 정보를 삭제하빈다.',
  })
  @ApiNoContentResponse({ description: '성공' })
  @ApiBearerAuth('accessToken')
  @HttpCode(204)
  @Delete('')
  @UseGuards(JwtAuthGuard)
  deleteUser(@GetUser() user: User) {
    return this.userService.deleteUserById(user.id);
  }
}

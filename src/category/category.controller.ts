import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import { CategoryService } from './category.service';
import { CategoryRequestDto } from './dto/category.dto';

@ApiTags('분류')
@Controller('shops')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: '쇼핑몰 분류 등록',
    description: '분류를 등록합니다.',
  })
  @ApiBody({
    type: CategoryRequestDto,
  })
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          id: 1,
          name: '남성',
          createdAt: '2022-03-08T05:46:09.209Z',
          updatedAt: '2022-03-08T05:46:09.209Z',
          deletedAt: null,
          Shop: {
            id: 1,
            name: '최저가 쇼핑',
            logo: 'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
            User: {
              id: 1,
              email: 'user@domain.com',
              name: '홍길동',
              phone: '010-0000-0000',
            },
          },
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @Post(':shopId/categories')
  @UseGuards(JwtAuthGuard)
  createUser(
    @GetUser() user: User,
    @Body() categoryRequestDto: CategoryRequestDto,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.categoryService.createCategory(
      categoryRequestDto,
      shopId,
      user,
    );
  }

  @ApiOperation({
    summary: '쇼핑몰 전체 분류 조회',
    description: '쇼핑몰에 등록된 모든 분류를 조회합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: [
          {
            id: 1,
            name: '남성',
          },
        ],
      },
    },
  })
  @Get(':shopId/categories')
  readProducts(@Param('shopId', ParseIntPipe) shopId: number) {
    return this.categoryService.readCategories(shopId);
  }
}

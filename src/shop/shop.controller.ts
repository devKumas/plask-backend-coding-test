import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateShopRequestDto } from './dto/create.shop.dto';
import { ShopService } from './shop.service';

@ApiTags('쇼핑몰')
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: '쇼핑몰 등록', description: '쇼핑몰을 등록합니다.' })
  @ApiBody({
    type: CreateShopRequestDto,
  })
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          id: 1,
          name: '최저가 쇼핑',
          logo: 'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
          createdAt: '2022-03-07T16:51:29.237Z',
          updatedAt: '2022-03-07T16:51:29.237Z',
          deletedAt: null,
          User: {
            id: 1,
            email: 'user@domain.com',
            name: '홍길동',
            phone: '010-0000-0000',
          },
        },
      },
    },
  })
  @ApiBearerAuth('accessToken')
  @Post('')
  @UseGuards(JwtAuthGuard)
  createShop(
    @GetUser() user: User,
    @Body() createShopRequestDto: CreateShopRequestDto,
  ) {
    return this.shopService.createShop(createShopRequestDto, user);
  }

  @ApiOperation({
    summary: '전체 쇼핑몰 조회',
    description: '등록된 모든 쇼핑몰을 조회합니다.',
  })
  @ApiQuery({ name: 'query', description: '검색어', required: false })
  @ApiQuery({
    name: 'pagingIndex',
    description: '페이지 번호 기본값: 1 ',
    required: false,
  })
  @ApiQuery({
    name: 'pagingSize',
    description: '한 페이지에 보여줄 갯수 기본값: 10',
    required: false,
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
            name: '최저가 쇼핑',
            logo: 'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
          },
        ],
      },
    },
  })
  @Get('')
  readShops(
    @Query('query') query: string,
    @Query('pagingIndex', new DefaultValuePipe(1), ParseIntPipe)
    pagingIndex: number,
    @Query('pagingSize', new DefaultValuePipe(10), ParseIntPipe)
    pagingSize: number,
  ) {
    return this.shopService.readShops(query, pagingIndex, pagingSize);
  }

  @ApiOperation({
    summary: '쇼핑몰 조회',
    description: '쇼핑몰을 조회합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: {
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
  })
  @ApiNotFoundResponse({
    description: '쇼핑몰을 찾을 수 없습니다.',
  })
  @Get('/:shopId')
  readShop(@Param('shopId', ParseIntPipe) shopId: number) {
    return this.shopService.readShop(shopId);
  }
}

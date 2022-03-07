import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
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
import { CreateProductRequestDto } from './dto/create.product.dto';
import { ProductService } from './product.service';

@ApiTags('상품')
@Controller('shops')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: '쇼핑몰 상품 등록',
    description: '쇼핑몰의 상품을 등록합니다.',
  })
  @ApiBody({
    type: CreateProductRequestDto,
  })
  @ApiCreatedResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        data: {
          id: 1,
          name: '캐보드 여아 여름 유니콘 원피스 2가지 옵션',
          description: '여름에 입기 딱 좋은 원피스',
          image:
            'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
          cost: 30000,
          price: 15000,
          createdAt: '2022-03-07T17:00:55.007Z',
          updatedAt: '2022-03-07T17:00:55.007Z',
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
  @Post(':shopId/products')
  @UseGuards(JwtAuthGuard)
  createProduct(
    @GetUser() user: User,
    @Body() createProductRequestDto: CreateProductRequestDto,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.productService.createProduct(
      createProductRequestDto,
      shopId,
      user,
    );
  }

  @ApiOperation({
    summary: '쇼핑몰 전체 상품 조회',
    description: '쇼핑몰에 등록된 모든 상품을 조회합니다.',
  })
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
  @ApiQuery({
    name: 'sort',
    description: '정렬 방식',
    required: false,
    enum: ['price_asc', 'price_desc', 'date', 'rating'],
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
            name: '캐보드 여아 여름 유니콘 원피스 2가지 옵션',
            description: '여름에 입기 딱 좋은 원피스',
            image:
              'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
            cost: '30000',
            price: '15000',
          },
        ],
      },
    },
  })
  @Get(':shopId/products')
  readProducts(
    @Param('shopId', ParseIntPipe) shopId: number,
    @Query('pagingIndex', new DefaultValuePipe(1), ParseIntPipe)
    pagingIndex: number,
    @Query('pagingSize', new DefaultValuePipe(10), ParseIntPipe)
    pagingSize: number,
    @Query('sort') sort: string,
  ) {
    return this.productService.readProducts(
      shopId,
      pagingIndex,
      pagingSize,
      sort,
    );
  }

  @ApiOperation({
    summary: '쇼핑몰 상품 조회',
    description: '상품의 상세정보를 확인합니다.',
  })
  @ApiOkResponse({
    description: '성공',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        data: {
          id: 1,
          name: '캐보드 여아 여름 유니콘 원피스 2가지 옵션',
          description: '여름에 입기 딱 좋은 원피스',
          image:
            'http://127.0.0.1:9000/img/9e3a152c-3e23-43c2-ae9b-e7bcbc6b4a16.png',
          cost: '30000',
          price: '15000',
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
  @ApiNotFoundResponse({ description: '상품을 찾을 수 없습니다' })
  @Get(':shopId/products/:productId')
  readProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('shopId', ParseIntPipe) shopId: number,
  ) {
    return this.productService.readProduct(productId, shopId);
  }

  @ApiOperation({
    summary: '쇼핑몰 상품 삭제',
    description: '상품을 삭제합니다.',
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
  @ApiNotFoundResponse({ description: '상품을 찾을 수 없습니다' })
  @ApiBearerAuth('accessToken')
  @Delete(':shopId/products/:productId')
  @UseGuards(JwtAuthGuard)
  deleteProduct(
    @GetUser() user: User,
    @Param('shopId', ParseIntPipe) shopId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productService.deleteProduct(productId, shopId, user);
  }
}

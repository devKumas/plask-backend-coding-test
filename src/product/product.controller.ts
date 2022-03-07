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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
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
  @ApiCreatedResponse({ description: '성공' })
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
  @ApiOkResponse({ description: '성공' })
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
  @ApiOkResponse({ description: '성공' })
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
  @ApiOkResponse({ description: '성공' })
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

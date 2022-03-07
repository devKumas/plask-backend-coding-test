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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/user.entity';
import {
  CreateShopRequestDto,
  CreateShopResponseDto,
} from './dto/create.shop.dto';
import { ReadShopRequestDto, ReadShopsRequestDto } from './dto/read.shop.dto';
import { ShopService } from './shop.service';

@ApiTags('쇼핑몰')
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({ summary: '쇼핑몰 등록', description: '쇼핑몰을 등록합니다.' })
  @ApiBody({
    type: CreateShopRequestDto,
  })
  @ApiCreatedResponse({ description: '성공', type: CreateShopResponseDto })
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
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiOkResponse({ description: '성공', type: [ReadShopsRequestDto] })
  @Get('')
  readShops(
    @Query('query') query: string,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    return this.shopService.readShops(query, offset);
  }

  @ApiOperation({
    summary: '쇼핑몰 조회',
    description: '쇼핑몰을 조회합니다.',
  })
  @ApiOkResponse({ description: '성공', type: ReadShopRequestDto })
  @Get('/:shopId')
  readShop(@Param('shopId', ParseIntPipe) shopId: number) {
    return this.shopService.readShop(shopId);
  }

  // @ApiOperation({
  //   summary: '쇼핑몰 수정',
  //   description: '쇼핑몰을 수정합니다.',
  // })
  // @ApiCreatedResponse({ description: '성공' })
  // @Patch('/:shopId')
  // @UseGuards(JwtAuthGuard)
  // updateShop() {
  //   return;
  // }

  // @ApiOperation({
  //   summary: '쇼핑몰 삭제',
  //   description: '쇼핑몰을 삭제합니다.',
  // })
  // @ApiCreatedResponse({ description: '성공' })
  // @Delete('/:shopId')
  // @UseGuards(JwtAuthGuard)
  // deleteShop() {
  //   return;
  // }
}

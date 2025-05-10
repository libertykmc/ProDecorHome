import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IdDto } from 'src/dto/common.dto';
import { BasketService } from './basket.service';
import { BasketRequestDto } from 'src/dto/basket.dto';
import { FavoritesRequestDto } from 'src/dto/favorites.dto';

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get()
  getBasket(@Query() dto: FavoritesRequestDto) {
    return this.basketService.getBaskets(dto);
  }

  @Post()
  createBasket(@Body() dto: BasketRequestDto) {
    return this.basketService.createBasket(dto);
  }

  @Put(':id')
  updateBasketQuantity(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: BasketRequestDto,
  ) {
    return this.basketService.updateBasketQuantity({
      id,
      quantity: dto.quantity,
    });
  }

  @Delete(':id')
  deleteBasket(@Param() id: IdDto) {
    return this.basketService.deleteBasket(id);
  }
}

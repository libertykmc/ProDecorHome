import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import {
  FavoritesAndOrderRequestDto,
  FavoritesRequestDto,
} from 'src/dto/favorites.dto';
import { IdDto } from 'src/dto/common.dto';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getFavorites(@Query() dto: FavoritesRequestDto) {
    return this.favoritesService.getFavorites(dto);
  }

  @Post()
  createFavorites(@Body() dto: FavoritesAndOrderRequestDto) {
    return this.favoritesService.createFavorites(dto);
  }

  @Delete(':id')
  deleteFavorites(@Param() id: IdDto) {
    return this.favoritesService.deleteFavorites(id);
  }
}

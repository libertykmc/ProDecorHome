import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IdDto } from 'src/dto/common.dto';
import {
  FavoritesAndOrderRequestDto,
  FavoritesRequestDto,
} from 'src/dto/favorites.dto';
import { MapperFavorites } from 'src/libs/mapper/favorites.mapper';
import { FavoritesEntity } from 'src/models/favorites.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataSource: DataSource) {}

  private get manager() {
    return this.dataSource.manager;
  }

  async getFavorites(dto: FavoritesRequestDto) {
    const favoritesEntities = await this.manager.find(FavoritesEntity, {
      where: {
        user_id: dto.user_id,
      },
      relations: {
        product: true,
        user: true,
      },
    });

    return MapperFavorites.toDtos(favoritesEntities);
  }

  async createFavorites(dto: FavoritesAndOrderRequestDto) {
    const id = randomUUID();

    const favoritesEntity = this.manager.create(FavoritesEntity, {
      ...dto,
      id,
    });

    await this.manager.save(favoritesEntity);

    const entity = await this.manager.findOne(FavoritesEntity, {
      where: {
        id,
      },
      relations: { product: true, user: true },
    });

    return MapperFavorites.toDto(entity);
  }

  async deleteFavorites(dto: IdDto) {
    await this.manager.delete(FavoritesEntity, {
      id: dto.id,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BasketRequestDto } from 'src/dto/basket.dto';
import { IdDto } from 'src/dto/common.dto';
import { FavoritesRequestDto } from 'src/dto/favorites.dto';
import { MapperBasket } from 'src/libs/mapper/basket.mapper';
import { BasketEntity } from 'src/models/basket.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(private readonly dataSource: DataSource) {}

  private get manager() {
    return this.dataSource.manager;
  }

  async getBaskets(dto: FavoritesRequestDto) {
    const basketEntities = await this.manager.find(BasketEntity, {
      where: {
        user_id: dto.user_id,
      },
      relations: {
        product: true,
        user: true,
      },
    });

    return MapperBasket.toDtos(basketEntities);
  }

  async createBasket(dto: BasketRequestDto) {
    const existedBasketEntity = await this.manager.findOneBy(BasketEntity, {
      product_id: dto.product_id,
      user_id: dto.user_id,
    });

    if (existedBasketEntity) {
      await this.manager.update(
        BasketEntity,
        { id: existedBasketEntity.id },
        { quantity: existedBasketEntity.quantity + 1 },
      );
      return;
    }

    const id = randomUUID();

    const basketEntity = this.manager.create(BasketEntity, {
      ...dto,
      id,
    });

    await this.manager.save(basketEntity);

    const entity = await this.manager.findOne(BasketEntity, {
      where: {
        id,
      },
      relations: { product: true, user: true },
    });

    return MapperBasket.toDto(entity);
  }

  async updateBasketQuantity(dto: { id: string; quantity: number }) {
    await this.manager.update(
      BasketEntity,
      { id: dto.id },
      { quantity: dto.quantity },
    );
  }

  async deleteBasket(dto: IdDto) {
    await this.manager.delete(BasketEntity, {
      id: dto.id,
    });
  }
}

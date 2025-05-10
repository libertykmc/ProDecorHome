import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { IdDto } from 'src/dto/common.dto';
import { FavoritesRequestDto, OrderDto } from 'src/dto/favorites.dto';
import { CreateOrderDto } from 'src/dto/order.dto';
import { mapBy } from 'src/helper/helper';
import { MapperOrder } from 'src/libs/mapper/order.mapper';
import { BasketEntity } from 'src/models/basket.entity';
import { OrderEntity } from 'src/models/order.entity';
import { ProductEntity } from 'src/models/product.entity';
import { Any, DataSource } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(private readonly dataSource: DataSource) {}

  private get manager() {
    return this.dataSource.manager;
  }

  async getAllOrders() {
    const orderEntities = await this.manager.find(OrderEntity);
    const productIds = [];
    orderEntities.forEach((item) => productIds.push(...item.product_ids));

    return MapperOrder.toDtos(orderEntities);
  }

  async getOrders(dto: FavoritesRequestDto): Promise<OrderDto[]> {
    const orderEntities = await this.manager.find(OrderEntity, {
      where: {
        user_id: dto.user_id,
      },
    });

    if (!orderEntities) return [];

    return MapperOrder.toDtos(orderEntities);
  }

  async getOrder(dto: IdDto): Promise<OrderDto> {
    const orderEntity = await this.manager.findOne(OrderEntity, {
      where: {
        id: dto.id,
      },
    });

    if (orderEntity) throw new Error('Order not found');

    const productEntities = await this.manager.findBy(ProductEntity, {
      id: Any(orderEntity.product_ids),
    });

    return MapperOrder.toDto(orderEntity);
  }

  async createOrder(dto: CreateOrderDto) {
    const orderEntity = this.manager.create(OrderEntity, {
      id: randomUUID(),
      create_at: dto.create_at,
      receipt_at: dto.receipt_at,
      product_ids: dto.product_ids,
      user_id: dto.user_id,
      values: dto.values,
    });

    await this.manager.save(orderEntity);

    await this.manager.delete(BasketEntity, {
      user_id: dto.user_id,
    });

    return orderEntity.id;
  }
}

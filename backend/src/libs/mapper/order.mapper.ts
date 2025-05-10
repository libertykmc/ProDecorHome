import { OrderDto } from 'src/dto/favorites.dto';
import { OrderEntity } from 'src/models/order.entity';
import { ProductEntity } from 'src/models/product.entity';

export class MapperOrder {
  static toDto(e: OrderEntity): OrderDto {
    return {
      id: e.id,
      user_id: e.user_id,
      values: e.values,
      product_ids: e.product_ids,
    };
  }

  static toDtos(e: OrderEntity[]) {
    return e.map((item) => {
      return MapperOrder.toDto(item);
    });
  }
}

import { BasketDto } from 'src/dto/basket.dto';
import { BasketEntity } from 'src/models/basket.entity';

export class MapperBasket {
  static toDto(e: BasketEntity): BasketDto {
    return {
      id: e.id,
      product_id: e.user_id,
      user_id: e.user_id,
      title: e.product.title,
      discount: e.product.discount,
      price: e.product.price,
      quantity: e.quantity,
    };
  }

  static toDtos(e: BasketEntity[]) {
    return e.map((item) => MapperBasket.toDto(item));
  }
}

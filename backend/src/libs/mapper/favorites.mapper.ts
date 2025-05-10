import { FavoritesDto } from 'src/dto/favorites.dto';
import { FavoritesEntity } from 'src/models/favorites.entity';

export class MapperFavorites {
  static toDto(e: FavoritesEntity): FavoritesDto {
    return {
      id: e.id,
      product_id: e.product_id,
      user_id: e.user_id,
      title: e.product.title,
      discount: e.product.discount,
      price: e.product.price,
    };
  }

  static toDtos(e: FavoritesEntity[]) {
    return e.map((item) => MapperFavorites.toDto(item));
  }
}

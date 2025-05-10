import { ProductDto } from 'src/dto/product.dto';
import { ProductQueryDto } from 'src/dto/product.query.dto';
import { FavoritesEntity } from 'src/models/favorites.entity';
import { ImageEntity } from 'src/models/image.entity';
import { ProductEntity } from 'src/models/product.entity';

export class MapperProduct {
  static toDto(
    p: ProductEntity,
    mapFavorites?: Map<string, FavoritesEntity>,
  ): ProductDto {
    const favorites = mapFavorites.get(p.id);
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      discount: p.discount,
      price: p.price,
      type: p.type,
      favorites_id: favorites ? favorites.id : null,
      images: p.images,
    };
  }

  static toDtos(
    p: ProductQueryDto[],
    mapFavorites?: Map<string, FavoritesEntity>,
  ): ProductDto[] {
    return p.map((item) => {
      return this.toDto(
        {
          id: item.product_id,
          title: item.product_title,
          description: item.product_description,
          discount: item.product_discount,
          price: item.product_price,
          type: item.product_type,
          images: item.product_images,
        },
        mapFavorites,
      );
    });
  }
}

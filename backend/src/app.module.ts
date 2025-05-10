import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { UserEntity } from './models/user.entity';
import { ProductModule } from './app/product/product.module';
import { ProductEntity } from './models/product.entity';
import { FavoritesModule } from './app/favorites/favorites.module';
import { FavoritesEntity } from './models/favorites.entity';
import { BasketModule } from './app/basket/basket.module';
import { BasketEntity } from './models/basket.entity';
import { OrderModule } from './app/order/order.module';
import { OrderEntity } from './models/order.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { ImageEntity } from './models/image.entity';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          UserEntity,
          ProductEntity,
          FavoritesEntity,
          BasketEntity,
          OrderEntity,
          ImageEntity,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    ProductModule,
    FavoritesModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

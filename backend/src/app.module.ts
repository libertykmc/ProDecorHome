import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './app/user/entities/user.entity';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
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
        entities: [UserEntity],
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.PRIVATE_KEY,
        signOptions: { expiresIn: '7d' },
      }),
    }),

    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}

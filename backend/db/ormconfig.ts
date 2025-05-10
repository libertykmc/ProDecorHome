import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { SimpleConsoleLogger } from 'typeorm';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.dev', override: true });

export = [
  {
    //name:'default',
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [join(__dirname, '..', 'libs/entity/src/*.entity.{ts,js}')],
    migrationsTableName: 'typeorm_migrations',
    migrationsTransactionMode: 'each',
    migrations: [join(__dirname, '..', 'src/migrations/*.{ts,js}')],
    logger: new SimpleConsoleLogger(),
    logging: ['error', 'migration', 'schema'],
    synchronize: false,
    options: {
      useUtc: true,
    },
    useUTC: true,
  } as TypeOrmModuleOptions,
];

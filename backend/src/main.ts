import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('src/ssl/key.pem'),
  //   cert: fs.readFileSync('src/ssl/certificate.pem'),
  // };
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // await app.listen(3000, '89.108.65.16');
  await app.listen('3000');
}
bootstrap();

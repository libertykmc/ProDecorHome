import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  app.setGlobalPrefix('api'); //чтобы все маршруты начинались с api
  app.enableCors(); //чтобы можно было отправлять запросы из других доменов

  const config = new DocumentBuilder()
    .setTitle('Kursovaya API')
    .setDescription('Тестим API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server started on port ${port}`);
}

bootstrap();

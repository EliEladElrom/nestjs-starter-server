/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { writeFileSync } from 'fs';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './utils/transform.interceptor';

const PORT = process.env.NESTJS_PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';
declare const module: __WebpackModuleApi.Module;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);

  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger UI Setup
  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('nextjs-starter-server')
      .setDescription('nextjs-starter-server')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    // Save Swagger OpenAPI JSON file within repository for automatic TS generation
    writeFileSync(`swagger/api.json`, JSON.stringify(document, null, 2));

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT);

  // Webpack HMR Setup
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

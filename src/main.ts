/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
*/

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as basicAuth from 'express-basic-auth';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './utils/transform.interceptor';

declare const module: __WebpackModuleApi.Module;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('NESTJS_PORT') || 8000;
  const isProduction = configService.get('PUBLIC_ENVIRONMENT') === 'production';

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
    const swaggerUser = configService.get<string>('SWAGGER_USER') || '';
    const swaggerPassword = configService.get<string>('SWAGGER_PASSWORD') || '';
    if (swaggerUser && swaggerPassword) {
      app.use(
        ['/docs', '/docs-json'],
        basicAuth({
          challenge: true,
          users: {
            [swaggerUser]: swaggerPassword,
          },
        })
      );

      const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS Server')
        .setDescription('NestJS API')
        .setVersion('1.0')
        .build();
      const document = SwaggerModule.createDocument(app, swaggerConfig);

      SwaggerModule.setup('docs', app, document);
    }
  }

  await app.listen(PORT);

  // Webpack HMR Setup
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

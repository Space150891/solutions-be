import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import helmet from 'helmet';
import * as path from 'path';
import * as favicon from 'serve-favicon';

import { AllExceptionsFilter } from './all-exception.filter';

export const enableCors = (app: INestApplication) => {
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Disposition',
      'Content-Type',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Content-Disposition', 'Authorization'],
  });
};

export const useDocumentation = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Cubex Health API')
    .setDescription('Cubex Health API Documentation')
    .setVersion('1.0')
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/api/docs', app, document);
};

export const useMiddlewares = (app: INestApplication) => {
  app.use(cookieParser());
  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
};

export const useGlobalHooks = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableShutdownHooks();
  app.setGlobalPrefix('api', {
    exclude: ['', 'api/docs'],
  });
};

export const useFavicon = (app: INestApplication) => {
  app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
};

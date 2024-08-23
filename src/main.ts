import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  enableCors,
  useDocumentation,
  useGlobalHooks,
  useMiddlewares,
} from './plugins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  enableCors(app);
  useMiddlewares(app);
  useDocumentation(app);
  useGlobalHooks(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { NestConfig } from './configs/config.interface';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');

  app.useGlobalPipes(new ValidationPipe());

  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  const port = process.env.PORT || nestConfig.port || 9000;
  await app.listen(port);
  Logger.log(
    `Application listening on localhost:${port} - ${process.env.NODE_ENV}`,
  );
}
bootstrap();

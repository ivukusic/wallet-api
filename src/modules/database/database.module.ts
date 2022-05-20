import { logger, MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Account } from '../account/account.entity';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          entities: [Account, Transaction, User],
          dbName: process.env.POSTGRES_DB,
          type: 'postgresql',
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
          host: process.env.POSTGRES_HOST,
          schema: process.env.POSTGRES_SCHEMA,
          debug: false,
          logger: logger.log.bind(logger),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseProviderModule {}

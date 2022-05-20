import { logger, MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';
import { Account } from './modules/account/account.entity';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { Transaction } from './modules/transaction/transaction.entity';
import { TransactionModule } from './modules/transaction/transaction.module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MikroOrmModule.forRoot({
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
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile:
            graphqlConfig.schemaDestination || './src/schema.graphql',
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          introspection: true,
          context: ({ req, res }) => ({ req, res }),
          cors: { credentials: true },
        };
      },
      inject: [ConfigService],
    }),
    AccountModule,
    AuthModule,
    TransactionModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

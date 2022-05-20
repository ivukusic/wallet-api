import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from '../../configs/config';
import { Account } from '../account/account.entity';
import { User } from '../user/user.entity';
import { DatabaseProviderModule } from './database.module';
import { Seeder } from './seeder';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    DatabaseProviderModule,
    MikroOrmModule.forFeature([Account, User]),
  ],
  providers: [SeederService, Logger, Seeder],
  exports: [SeederService],
})
export class SeederModule {}

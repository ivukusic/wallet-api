import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Transaction } from './transaction.entity';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  imports: [MikroOrmModule.forFeature([Transaction])],
  providers: [TransactionResolver, TransactionService],
  exports: [],
})
export class TransactionModule {}

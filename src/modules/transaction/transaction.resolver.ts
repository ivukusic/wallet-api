import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserEntity } from 'src/common/decorators/current.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

import { User } from '../user/user.entity';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionCreateInput } from './input/TransactionCreate.input';
import { TransactionCount } from './transaction.interface';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { TransactionWhere } from './input/transactionWhere.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => TransactionCount)
  async transactionList(
    @Args({ name: 'pagination', type: () => PaginationArgs, nullable: true })
    pagination: PaginationArgs,
    @Args({ name: 'where', type: () => TransactionWhere, nullable: true })
    where: TransactionWhere,
  ): Promise<TransactionCount> {
    return this.transactionService.transactionList(where, pagination);
  }

  @Mutation(() => Transaction)
  async transactionCreate(
    @Args('data') data: TransactionCreateInput,
    @UserEntity() currentUser: User,
  ): Promise<Transaction> {
    return this.transactionService.transactionCreate(data, currentUser);
  }
}

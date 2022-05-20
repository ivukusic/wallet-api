import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { UserEntity } from 'src/common/decorators/current.decorator';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

import { User } from '../user/user.entity';
import { TransactionCreateInput } from './input/transactionCreate.input';
import { TransactionWhere } from './input/transactionWhere.input';
import { Transaction } from './transaction.entity';
import { TransactionCount } from './transaction.interface';
import { TransactionService } from './transaction.service';

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

import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from 'src/common/decorators/current.decorator';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

import { User } from '../user/user.entity';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountCreateInput } from './input/accountCreate.input';

@UseGuards(GqlAuthGuard)
@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  async accountCreate(
    @Args('data') data: AccountCreateInput,
    @UserEntity() currentUser: User,
  ): Promise<Account> {
    return this.accountService.accountCreate(data, currentUser);
  }
}

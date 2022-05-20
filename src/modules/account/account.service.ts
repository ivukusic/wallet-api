import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { CurrencyType } from 'src/common/enums';

import { User } from '../user/user.entity';
import { Account } from './account.entity';
import { AccountCreateInput } from './input/accountCreate.input';

const INITIAL_BALANCE = {
  [CurrencyType.EUR]: 1000,
  [CurrencyType.USD]: 1000,
  [CurrencyType.YEN]: 100000,
};

@Injectable()
export class AccountService {
  constructor(private readonly em: EntityManager) {}

  async accountCreate(
    data: AccountCreateInput,
    currentUser: User,
  ): Promise<Account> {
    const { currency } = data;
    const account = await this.em.findOne(Account, { currency });

    if (account) {
      return account;
    }

    const accounts = await this.em.find(Account, {
      user: { id: currentUser.id },
    });
    try {
      const account = await this.em.create(Account, {
        ...data,
        balance: INITIAL_BALANCE[currency],
        user: currentUser,
        default: !accounts?.length,
      });

      await this.em.persistAndFlush(account);

      return account;
    } catch (e) {}
  }
}

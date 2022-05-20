import { EntityManager, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { PaginationArgs } from 'src/common/pagination/pagination.args';

import { Account } from '../account/account.entity';
import { User } from '../user/user.entity';
import { TransactionCreateInput } from './input/TransactionCreate.input';
import { TransactionWhere } from './input/transactionWhere.input';
import { Transaction } from './transaction.entity';
import { TransactionCount } from './transaction.interface';

@Injectable()
export class TransactionService {
  constructor(private readonly em: EntityManager) {}

  async transactionList(whereArgs: TransactionWhere, pagination: PaginationArgs): Promise<TransactionCount> {
    const where = {
      ...(whereArgs || {}),
    };
    if (where.or) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      where.$or = where.or;
      delete where.or;
    }

    const res = await this.em.findAndCount(Transaction, where, {
      populate: ['receiver', 'receiver.accounts', 'sender', 'sender.accounts'],
      orderBy: { createdAt: QueryOrder.DESC },
      ...(pagination || {}),
    });
    return { data: res[0], count: res[1] };
  }

  async transactionCreate(
    { receiverId, amount, currency, description, exchangeRate }: TransactionCreateInput,
    currentUser: User,
  ): Promise<Transaction> {
    const receiver = await this.em.findOne(User, { id: receiverId });
    const accountSender = await this.em.findOne(Account, {
      user: currentUser,
      default: true,
    });
    const accountReceiver = await this.em.findOne(Account, {
      user: receiver,
      default: true,
    });

    if (accountSender.currency !== currency) {
      accountSender.balance = accountSender.balance - amount / exchangeRate;
    } else {
      accountSender.balance = accountSender.balance - amount;
    }

    if (accountReceiver.currency !== currency) {
      accountReceiver.balance = accountReceiver.balance + amount * exchangeRate;
    } else {
      accountReceiver.balance = accountReceiver.balance + amount;
    }

    try {
      const transaction = await this.em.create(Transaction, {
        amount,
        currency,
        description,
        exchangeRate,
        receiver,
        sender: currentUser,
      });

      await this.em.persistAndFlush([accountReceiver, accountSender, transaction]);

      return transaction;
    } catch (e) {
      throw new Error(e);
    }
  }
}

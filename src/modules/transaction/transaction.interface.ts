import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { Transaction } from './transaction.entity';

export interface ITransactionCount {
  data: Transaction[];
  count: number;
}

@ObjectType({ description: 'Account Entity' })
@InputType({ isAbstract: true })
export class TransactionCount {
  @Field(() => [Transaction])
  data: Transaction[];

  @Field()
  count: number;
}

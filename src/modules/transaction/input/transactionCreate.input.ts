import { InputType, Field, Float, ID } from '@nestjs/graphql';

import { CurrencyType } from 'src/common/enums';

@InputType()
export class TransactionCreateInput {
  @Field(() => CurrencyType, { nullable: false })
  currency: CurrencyType;

  @Field(() => Float, { nullable: false })
  amount: number;

  @Field(() => Float, { nullable: false })
  exchangeRate: number;

  @Field(() => ID, { nullable: false })
  receiverId: string;

  @Field({ description: 'Description', nullable: true })
  description?: string;
}

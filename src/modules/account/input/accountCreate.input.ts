import { InputType, Field } from '@nestjs/graphql';

import { CurrencyType } from 'src/common/enums';

@InputType()
export class AccountCreateInput {
  @Field(() => CurrencyType, { nullable: false })
  currency: CurrencyType;
}

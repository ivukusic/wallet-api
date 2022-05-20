import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereFields {
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class TransactionWhereFields {
  @Field(() => UserWhereFields, { nullable: true })
  receiver?: UserWhereFields;

  @Field(() => UserWhereFields, { nullable: true })
  sender?: UserWhereFields;
}

@InputType()
export class TransactionWhere extends TransactionWhereFields {
  @Field(() => [TransactionWhereFields], { nullable: true })
  or?: UserWhereFields[];
}

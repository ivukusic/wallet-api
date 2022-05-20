import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
  @Field(() => Number, { nullable: true })
  offset?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}

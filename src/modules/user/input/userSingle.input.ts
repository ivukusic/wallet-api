import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserSingleInput {
  @Field(() => ID)
  id: string;
}

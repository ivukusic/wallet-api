import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthRefreshTokenInput {
  @Field()
  refreshToken: string;
}

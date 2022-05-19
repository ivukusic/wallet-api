import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { GenderType } from 'src/common/enums';

@InputType()
export class AuthSignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  firstName: string;

  @Field(() => String, { nullable: false })
  lastName: string;

  @Field(() => GenderType, { nullable: true })
  gender?: GenderType;

  @Field(() => String, { nullable: true })
  phone?: string;
}

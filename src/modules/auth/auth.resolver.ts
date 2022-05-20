import { UseGuards, UsePipes } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { UserEntity } from 'src/common/decorators/current.decorator';
import { EmailTransformPipe } from 'src/common/pipes/email.pipe';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

import { User } from '../user/user.entity';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { AuthRefreshTokenInput } from './input/authRefreshToken.input';
import { AuthSignupInput } from './input/authSignup.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@UserEntity() currentUser: User): Promise<User> {
    return currentUser;
  }

  @Mutation(() => Auth)
  @UsePipes(new EmailTransformPipe())
  async authSignup(@Args('data') data: AuthSignupInput): Promise<Auth> {
    return this.auth.authSignup(data);
  }

  @Mutation(() => Auth)
  @UsePipes(new EmailTransformPipe())
  async authRefreshToken(
    @Args('data') data: AuthRefreshTokenInput,
  ): Promise<Auth> {
    return this.auth.authRefreshToken(data);
  }
}

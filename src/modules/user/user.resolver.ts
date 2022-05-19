import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserService } from 'src/modules/user/user.service';

import { UserSingleInput } from './input/userSingle.input';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('data') data: UserSingleInput) {
    return this.userService.findOneById(data);
  }
}

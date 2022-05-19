import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserSingleInput } from './input/userSingle.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findOneById({ id }: UserSingleInput): Promise<User> {
    return this.em.findOne(User, { id });
  }
}

import { faker } from '@faker-js/faker';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { CurrencyType } from 'src/common/enums';

import { User } from '../user/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async usersCreate() {
    let users = await this.userRepository.findAll();

    if (users?.length) {
      return users;
    }

    users = [];
    const currencies = [CurrencyType.EUR, CurrencyType.USD, CurrencyType.YEN];
    for (let i = 0; i < 8; i++) {
      const currency = currencies[Math.floor(Math.random() * 3)] as any;

      const balance = currency === CurrencyType.YEN ? 100000 : 1000;
      const user = await this.userRepository.create({
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        accounts: [
          {
            balance,
            currency,
            default: true,
          },
        ],
      });
      users.push(user);
    }

    await this.userRepository.flush();
    return users;
  }
}

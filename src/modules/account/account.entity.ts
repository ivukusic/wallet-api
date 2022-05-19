import {
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CurrencyType } from 'src/common/enums';

import { BaseEntity } from '../base.model';
import { User } from '../user/user.entity';

@Entity()
@ObjectType({ description: 'Account Entity' })
@InputType({ isAbstract: true })
export class Account extends BaseEntity {
  @Enum({ items: () => CurrencyType, nullable: false, type: Enum })
  @Field((_type) => CurrencyType, {
    description: 'EUR/USD/YEN',
    nullable: true,
  })
  public currency: CurrencyType;

  @Property({ nullable: false })
  @Field({ description: 'Account balance', nullable: false })
  balance: number;

  @Property({ nullable: false })
  @Field({ description: 'Account balance', nullable: false })
  default: boolean;

  @ManyToOne({ entity: () => User, nullable: false })
  @Field((_type) => User, { nullable: true })
  public user: IdentifiedReference<User>;
}

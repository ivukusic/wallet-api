import {
  Entity,
  Enum,
  FloatType,
  IdentifiedReference,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

import { CurrencyType } from 'src/common/enums';

import { BaseEntity } from '../base.model';
import { User } from '../user/user.entity';

@Entity()
@ObjectType({ description: 'Account Entity' })
@InputType({ isAbstract: true })
export class Account extends BaseEntity {
  @Enum({ items: () => CurrencyType, nullable: false, type: Enum })
  @Field(() => CurrencyType, {
    description: 'EUR/USD/YEN',
    nullable: true,
  })
  public currency: CurrencyType;

  @Property({ type: FloatType })
  @Field(() => Float, { description: 'Amount', nullable: false })
  public balance: number;

  @Property({ nullable: false })
  @Field({ description: 'Account balance', nullable: false })
  default: boolean;

  @ManyToOne({ entity: () => User, nullable: false })
  @Field(() => User, { nullable: true })
  public user: IdentifiedReference<User>;
}

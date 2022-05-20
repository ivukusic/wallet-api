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
export class Transaction extends BaseEntity {
  @Enum({ items: () => CurrencyType, nullable: false, type: Enum })
  @Field(() => CurrencyType, {
    description: 'EUR/USD/YEN',
    nullable: true,
  })
  public currency: CurrencyType;

  @Property({ type: FloatType })
  @Field(() => Float, { description: 'Amount', nullable: false })
  public amount: number;

  @Property({ type: FloatType })
  @Field(() => Float, { description: 'Exchange rate', nullable: false })
  public exchangeRate: number;

  @Property({ nullable: true })
  @Field({ description: 'Description', nullable: true })
  description?: string;

  @ManyToOne({ entity: () => User, nullable: false })
  @Field(() => User, { nullable: true })
  public sender: IdentifiedReference<User>;

  @ManyToOne({ entity: () => User, nullable: false })
  @Field(() => User, { nullable: true })
  public receiver: IdentifiedReference<User>;
}

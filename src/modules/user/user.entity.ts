import {
  Cascade,
  Collection,
  Entity,
  Enum,
  LoadStrategy,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CurrencyType, GenderType } from 'src/common/enums';

import { Account } from '../account/account.entity';
import { BaseEntity } from '../base.model';

@Entity()
@ObjectType({ description: 'User Entity' })
@InputType({ isAbstract: true })
export class User extends BaseEntity {
  @Property({ length: 255, nullable: false })
  @Field({ description: 'First name', nullable: false })
  public firstName: string;

  @Property({ length: 255, nullable: false })
  @Field({ description: 'Last name', nullable: false })
  public lastName: string;

  @Property({ length: 255, nullable: false, unique: true })
  @Field({ description: 'Email address', nullable: false })
  public email: string;

  @Property({ length: 255, nullable: true, unique: false })
  @Field(() => String, { description: 'Phone Number', nullable: true })
  public phone?: string;

  @Enum({ items: () => GenderType, nullable: true, type: Enum })
  @Field(() => GenderType, {
    description: 'Male/Female/Other',
    nullable: true,
  })
  public gender?: GenderType;

  @Enum({ items: () => CurrencyType, nullable: true, type: Enum })
  @Field(() => CurrencyType, {
    description: 'EUR/USD/YEN',
    nullable: true,
  })
  public currency?: CurrencyType;

  @OneToMany({
    entity: () => Account,
    mappedBy: (account) => account.user,
    cascade: [Cascade.PERSIST],
    strategy: LoadStrategy.SELECT_IN,
    nullable: true,
  })
  @Field(() => [Account], { nullable: true })
  public accounts?: Collection<Account> = new Collection<Account>(this);
}

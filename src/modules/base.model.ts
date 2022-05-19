import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Directive, Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType({ isAbstract: true }) // GraphQL (it is not a real entity)
@InputType({ isAbstract: true }) // GraphQL (it is not a real entity)
@Entity({ abstract: true }) // GraphQL
@Directive('@extends') // GraphQL
@Directive('@key(fields: "id")') // GraphQL
export abstract class BaseEntity {
  @Field((_type) => ID, { nullable: false, defaultValue: null }) // GraphQL
  @PrimaryKey({ type: 'uuid', nullable: false }) // NestJs / MikroORM
  public id: string;

  @Field((_type) => Date)
  @Property({ type: Date, nullable: false })
  public createdAt: Date = new Date();

  @Field((_type) => Date)
  @Property({ onUpdate: () => new Date(), type: Date, nullable: false })
  public updatedAt: Date = new Date();

  constructor(id?: string) {
    this.id = id || v4();
  }
}

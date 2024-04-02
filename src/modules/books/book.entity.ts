import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Ref,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../author/author.entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  @Field(() => ID)
  public id!: string;

  @Property()
  @Field()
  name: string;

  @Field(() => Author, { nullable: true })
  @OneToOne(() => 'Author', (author: Author) => author.book, {
    wrappedReference: true,
    owner: true,
  })
  public author!: Ref<Author>;

  constructor(name: string) {
    this.name = name;
  }
}

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
import type { Book } from '../books/book.entity';

@Entity()
@ObjectType()
export class Author {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  @Field(() => ID)
  public id!: string;

  @Property()
  @Field()
  name: string;

  @OneToOne(() => 'Book', (book: Book) => book.author, {
    wrappedReference: true,
    nullable: true,
  })
  public book?: Ref<Book>;

  constructor(name: string) {
    this.name = name;
  }
}

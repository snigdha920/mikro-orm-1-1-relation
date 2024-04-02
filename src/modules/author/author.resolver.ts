import { MikroORM } from '@mikro-orm/core';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly orm: MikroORM,
  ) {}

  @Query(() => Author)
  async findAuthor(@Args('id') id: string) {
    return await this.authorService.findAuthorById(id);
  }

  @Mutation(() => Author)
  async createAuthor() {
    const author = await this.authorService.createAuthorAndBook('author');
    return author;
  }
}

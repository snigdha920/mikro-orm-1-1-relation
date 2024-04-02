import { MikroORM, ref } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Author } from './author.entity';
import { Book } from '../books/book.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly orm: MikroORM) {}
  async findAuthorById(id: string) {
    const authorRepository = this.orm.em.getRepository(Author);
    const author = await authorRepository.findOneOrFail(
      { id },
      // { populate: ['book'] },
    );
    const book = await author.book.load(); // THIS SHOULD WORK?
    // console.log({ book });

    const bookRepository = this.orm.em.getRepository(Book);
    const bookFromDb = await bookRepository.findOneOrFail({
      author: author.id,
    });
    const authorFromBook = await bookFromDb.author.load();
    console.log({ authorFromBook });

    return authorFromBook;
  }

  async createAuthorAndBook(name: string) {
    const author = new Author(name);
    await this.orm.em.persistAndFlush([author]);

    // Create book and set author
    const authorFromDb = await this.orm.em
      .getRepository(Author)
      .findOneOrFail({ id: author.id });
    const book = new Book('book');
    book.author = ref(authorFromDb);
    await this.orm.em.persistAndFlush([book]);

    return author;
  }
}

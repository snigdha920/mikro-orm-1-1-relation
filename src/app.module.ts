import { MongoDriver } from '@mikro-orm/mongodb';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Author } from './modules/author/author.entity';
import { AuthorResolver } from './modules/author/author.resolver';
import { AuthorService } from './modules/author/author.service';
import { Book } from './modules/books/book.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      dbName: 'nestjs-mikro-test',
      port: 27017,
      driver: MongoDriver,
      entities: [Author, Book],
      validate: true,
      debug: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
  ],
  providers: [AuthorService, AuthorResolver],
})
export class AppModule {}

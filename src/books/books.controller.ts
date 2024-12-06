import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Post()
  addBook(@Body() book: { title: string; author: string }): Book {
    return this.booksService.addBook(book.title, book.author);
  }

  @Get(':id')
  getBook(@Param('id') id: number): Book | null {
    return this.booksService.getBookById(id);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() book: { title: string; author: string },
  ): Book | null {
    return this.booksService.updateBook(id, book.title, book.author);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): boolean {
    return this.booksService.deleteBook(id);
  }
}

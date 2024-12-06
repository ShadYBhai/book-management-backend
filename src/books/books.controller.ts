import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  addBook(@Body() createBookDto: { title: string; author: string }) {
    const { title, author } = createBookDto;

    if (!title || !author) {
      throw new BadRequestException('Title and author are required');
    }

    return this.bookService.addBook(title, author);
  }
}

// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';
import { Types } from 'mongoose';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks(); // Return all books
  }

  @Post()
  async addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.addBook(createBookDto); // Add a new book
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.getBookById(id); // Get a book by its ID
  }

  @Get('search')
  async searchBook(@Query('query') query: string): Promise<Book[]> {
    return this.booksService.searchBook(query); // Search books by query
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    // Check if the id is present and valid
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new Error('Invalid or missing ObjectId');
    }

    const bookId = new Types.ObjectId(id); // Create ObjectId from string
    return this.booksService.updateBook(bookId, updateBookDto); // Pass valid ObjectId to the service
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<boolean> {
    return this.booksService.deleteBook(id); // Delete a book
  }
}

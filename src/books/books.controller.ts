import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Post()
  addBook(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.addBook(createBookDto);
  }

  //   @Post():
  // This decorator maps this method to handle HTTP POST requests sent to /books.

  // @Body():
  // Extracts the body of the HTTP request and maps it to the createBookDto object.

  // createBookDto: CreateBookDto:
  // The incoming body must match the structure and validation rules defined in CreateBookDto. If the rules are violated, the server will throw a validation error.

  // this.booksService.createBook(createBookDto):
  // Passes the validated createBookDto to the service layer to handle the actual logic for creating a book.

  @Get(':id')
  getBook(@Param('id') id: number): Book | null {
    return this.booksService.getBookById(id);
  }
  @Get('search')
  searchBook(@Query('query') query: string) {
    console.log('Received query:', query);
    return this.booksService.searchBook(query);
  }

  @Put(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() upddateBookDto: UpdateBookDto,
  ): Book | null {
    return this.booksService.updateBook(id, upddateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number): boolean {
    return this.booksService.deleteBook(id);
  }
}

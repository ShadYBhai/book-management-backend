import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './dto/create-book.dto';
import { title } from 'process';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async searchBook(query: string): Promise<Book[]> {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      return this.getAllBooks();
    }
    return this.bookModel
      .find({
        $or: [
          { title: { $regex: trimmedQuery, $options: 'i' } },
          { author: { $regex: trimmedQuery, $options: 'i' } },
        ],
      })
      .exec();
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }
  async updateBook(
    bookId: Types.ObjectId,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        bookId,
        updateBookDto,
        {
          new: true, // Return updated document
          runValidators: true, // Run validation rules
        },
      );

      if (!updatedBook) {
        throw new Error('Book not found');
      }

      console.log(`Book updated: ${updatedBook._id}`); // Log updated book details (optional)
      return updatedBook;
    } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Could not update the book');
    }
  }
  async deleteBook(id: string): Promise<boolean> {
    const result = await this.bookModel.findByIdAndDelete(id).exec(); // Delete by ID
    return result !== null; // Return true if a book was deleted, otherwise false
  }
  // getAllBooks(): Book[] {
  //   return this.books;
  // }
  // addBook(createBookDto: CreateBookDto): Book {
  //   const { title, author, genre } = createBookDto;
  //   const newBook: Book = {
  //     id: this.idCounter++,
  //     title,
  //     author,
  //     genre: genre || null,
  //   };
  //   this.books.push(newBook);
  //   return newBook;
  // }
  // searchBook(query: string): Book[] {
  //   const trimmedQuery = query.trim().toLowerCase();
  //   if (!trimmedQuery) {
  //     console.log('Empty search query, returning all books.');
  //     return this.books;
  //   }
  //   const filteredBooks = this.books.filter((book) => {
  //     const matchesTitle = book.title.toLowerCase().includes(trimmedQuery);
  //     const matchesAuthor = book.author.toLowerCase().includes(trimmedQuery);
  //     return matchesTitle || matchesAuthor;
  //   });
  //   console.log('Search results:', filteredBooks);
  //   return filteredBooks;
  // }
  // getBookById(id: number): Book | null {
  //   return this.books.find((book) => book.id === id) || null;
  // }
  // updateBook(id: number, updateBookDto: UpdateBookDto): Book | null {
  //   const book = this.getBookById(id);
  //   if (book) {
  //     const { title, author, genre } = updateBookDto;
  //     if (title !== undefined) book.title = title;
  //     if (author !== undefined) book.author = author;
  //     if (genre !== undefined) book.genre = genre;
  //     return book;
  //   }
  //   return null; // Return null if no book was found
  // }
  // deleteBook(id: number): boolean {
  //   const index = this.books.findIndex((book) => book.id === id);
  //   if (index !== -1) {
  //     this.books.splice(index, 1);
  //     return true;
  //   }
  //   return false;
  // }
}

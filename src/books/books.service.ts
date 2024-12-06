import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private idCounter = 1;

  getAllBooks(): Book[] {
    return this.books;
  }

  addBook(title: string, author: string): Book {
    if (!title || !author) {
      throw new Error('Title and author are required');
    }

    const newBook = { id: this.idCounter++, title, author };
    this.books.push(newBook);
    return newBook;
  }

  getBookById(id: number): Book | null {
    return this.books.find((book) => book.id === id) || null;
  }

  updateBook(id: number, title?: string, author?: string): Book | null {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return null;
    }

    const updatedBook = {
      ...this.books[bookIndex],
      ...(title && { title }),
      ...(author && { author }),
    };

    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }

  deleteBook(id: number): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== id);
    return this.books.length < initialLength;
  }
}
import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  ];
  private idCounter = 4;

  getAllBooks(): Book[] {
    return this.books;
  }

  searchBook(query: string): Book[] {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      console.log('Empty search query, returning all books.');
      return this.books;
    }

    const filteredBooks = this.books.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(trimmedQuery);
      const matchesAuthor = book.author.toLowerCase().includes(trimmedQuery);
      return matchesTitle || matchesAuthor;
    });

    console.log('Search results:', filteredBooks);
    return filteredBooks;
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
      console.error(`Book with ID ${id} not found.`);
      return null;
    }

    const updatedBook = {
      ...this.books[bookIndex],
      ...(title ? { title } : {}),
      ...(author ? { author } : {}),
    };

    this.books[bookIndex] = updatedBook;
    console.log('Updated book:', updatedBook);
    return updatedBook;
  }

  deleteBook(id: number): boolean {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.id !== id);
    return this.books.length < initialLength;
  }
}

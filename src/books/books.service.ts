import { Injectable } from '@nestjs/common';

export interface Book {
  id: number;
  title: string;
  author: string;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      category: 'Fiction',
      summary:
        'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan, set in the Roaring Twenties.',
      keywords: ['wealth', 'love', 'American Dream'],
      publicationYear: 1925,
      rating: 4.4,
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
      category: 'Science Fiction',
      summary:
        'A chilling depiction of a totalitarian regime where Big Brother controls everything, and individualism is crushed.',
      keywords: ['totalitarianism', 'freedom', 'oppression'],
      publicationYear: 1949,
      rating: 4.6,
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Classic',
      category: 'Drama',
      summary:
        'A profound novel about racial injustice in the Deep South seen through the eyes of young Scout Finch.',
      keywords: ['justice', 'racism', 'morality'],
      publicationYear: 1960,
      rating: 4.8,
    },
    {
      id: 4,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Classic',
      category: 'Fiction',
      summary:
        'A story about teenage rebellion, identity, and the struggles of growing up, narrated by Holden Caulfield.',
      keywords: ['adolescence', 'identity', 'rebellion'],
      publicationYear: 1951,
      rating: 4.2,
    },
    {
      id: 5,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Dystopian',
      category: 'Science Fiction',
      summary:
        'A provocative vision of a future society controlled by technology and conditioning, where individuality is lost.',
      keywords: ['society', 'technology', 'control'],
      publicationYear: 1932,
      rating: 4.5,
    },
    {
      id: 6,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      category: 'Classic',
      summary:
        'The story of Elizabeth Bennet as she navigates love, social status, and family in 19th-century England.',
      keywords: ['love', 'marriage', 'society'],
      publicationYear: 1813,
      rating: 4.7,
    },
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

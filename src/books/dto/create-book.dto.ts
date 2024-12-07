// A DTO defines the shape of the data that is transferred between different parts of your application.
// It is typically used to define the structure of request or response data.

// Purpose:

// To validate the incoming data (e.g., using class-validator).
// To provide a consistent data structure across your application.
// To ensure that only necessary data is passed between layers (e.g., controller to service).

// DTOs are usually defined as TypeScript classes and decorated with validation decorators.

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// class CreateBookDto: Defines a class used as a Data Transfer Object (DTO)
// for creating a new book. It specifies the structure and validation rules for incoming data.

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  genre?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  genre?: string;
}

// @IsString(): Ensures the field is a string.
// @IsNotEmpty(): Ensures the field is not empty. This is used for required fields like title and author.
// @IsOptional(): Marks the genre field as optional. If provided, it must be a string.
// title: string;: Declares a required title field of type string.
// author: string;: Declares a required author field of type string.
// genre?: string;: Declares an optional genre field of type string (indicated by the ?).

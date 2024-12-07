// A DTO defines the shape of the data that is transferred between different parts of your application.
// It is typically used to define the structure of request or response data.

// Purpose:

// To validate the incoming data (e.g., using class-validator).
// To provide a consistent data structure across your application.
// To ensure that only necessary data is passed between layers (e.g., controller to service).

// DTOs are usually defined as TypeScript classes and decorated with validation decorators.

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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

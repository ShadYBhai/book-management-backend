// src/books/schemas/book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true }) // Marks this property as required
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false }) // Optional property
  genre?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

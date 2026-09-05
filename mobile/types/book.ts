export type BookList =
  | 'currentlyReading'
  | 'wishlist'
  | 'finished'
  | 'bookshelf'
  | 'recommendations';

export type Book = {
  id: string;
  title: string;
  author: string;
  description?: string;
  genre?: string;
  pages?: number;
  publishedYear?: number;
  isbn?: string;
  coverColor?: string;
  rating?: number;
  progress?: number;
  list: BookList;
  coverUrl?: string;
};
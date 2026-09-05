export type BookList =
  | 'currentlyReading'
  | 'wishlist'
  | 'finished'
  | 'bookshelf'
  | 'recommendations';

export type Book = {
  id: string;
  title: string;
  authors: string[];
  coverUrl?: string;
  firstPublishYear?: number;
  rating?: number;
  progress?: number;
  list: BookList;
};
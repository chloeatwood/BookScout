export type BookList =
  | 'currently_reading'
  | 'wishlist'
  | 'finished'
  | 'bookshelf';

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  pubDate?: string;
  coverUrl?: string;
  totalPages?: number;
  pagesRead?: number;
  rating?: number;
  notes?: string;
  lists: BookList[];
};
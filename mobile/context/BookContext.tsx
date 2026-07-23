import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { sampleBooks } from '@/data/sampleBooks';
import { Book, BookList } from '@/types/book';

type BookContextType = {
  books: Book[];

  getBooksByList: (list: BookList) => Book[];

  addBook: (
    book: Book,
    list: BookList
  ) => void;
};

const BookContext = createContext<
  BookContextType | undefined
>(undefined);

export function BookProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [books, setBooks] = useState<Book[]>(
    sampleBooks
  );

  const getBooksByList = (list: BookList) => {
    return books.filter(
      (book) => book.list === list
    );
  };

  const addBook = (
  book: Omit<Book, 'list'>,
  list: BookList
  ) => {
  setBooks((currentBooks) => [
      ...currentBooks,
      {
      ...book,
      list,
      },
  ]);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getBooksByList,
        addBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      'useBooks must be used inside BookProvider'
    );
  }

  return context;
}
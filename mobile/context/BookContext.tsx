import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '@/utils/supabase';
import { Book, BookList } from '@/types/book';

type BookContextType = {
  books: Book[];
  loading: boolean;
  getBooksByList: (list: BookList) => Book[];
  refreshBooks: () => Promise<void>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshBooks = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('users_books')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load books:', error.message);
      setLoading(false);
      return;
    }

    const mapped: Book[] = (data ?? []).map((row) => ({
      id: row.book_id,
      title: row.title,
      author: row.author,
      isbn: row.isbn ?? undefined,
      pubDate: row.pub_date ?? undefined,
      coverUrl: row.cover_url ?? undefined,
      totalPages: row.total_pages ?? undefined,
      pagesRead: row.pages_read ?? undefined,
      rating: row.rating ?? undefined,
      notes: row.personal_notes ?? undefined,
      lists: row.lists ?? [],
    }));

    setBooks(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount
    void refreshBooks();
  }, [refreshBooks]);

  const getBooksByList = (list: BookList) =>
    books.filter((book) => book.lists.includes(list));

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        getBooksByList,
        refreshBooks,
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
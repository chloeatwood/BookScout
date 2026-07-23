import { Book } from '@/types/book';

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'Bilbo Baggins is a quiet hobbit whose comfortable life is interrupted by an unexpected adventure.',
    genre: 'Fantasy',
    pages: 310,
    publishedYear: 1937,
    isbn: '9780547928227',
    coverColor: '#4C2719',
    progress: 62,
    rating: 5,
    list: 'currentlyReading',
  },
  {
    id: '2',
    title: 'A Court of Thorns and Roses',
    author: 'Sarah J. Maas',
    description:
      'A young huntress is drawn into a dangerous magical world after killing a wolf in the woods.',
    genre: 'Fantasy',
    pages: 419,
    publishedYear: 2015,
    isbn: '9781619634442',
    coverColor: '#16302B',
    progress: 24,
    list: 'currentlyReading',
  },
  {
    id: '3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever.',
    genre: 'Fiction',
    pages: 304,
    publishedYear: 2020,
    isbn: '9780525559474',
    coverColor: '#9FA0C3',
    rating: 4,
    list: 'finished',
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description:
      'A lone astronaut must solve an impossible problem to save humanity.',
    genre: 'Science Fiction',
    pages: 496,
    publishedYear: 2021,
    isbn: '9780593135204',
    coverColor: '#A6D3A0',
    list: 'wishlist',
  },
  {
    id: '5',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    description:
      'The story of Kvothe, a legendary musician, magician, and adventurer.',
    genre: 'Fantasy',
    pages: 662,
    publishedYear: 2007,
    isbn: '9780756404741',
    coverColor: '#210203',
    list: 'bookshelf',
  },
];
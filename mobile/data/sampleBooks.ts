import { Book } from '@/types/book';

export const sampleBooks: Book[] = [
  // Currently Reading
  {
    id: '1',
    title: 'The Hobbit',
    authors: ['J.R.R. Tolkien'],
    firstPublishYear: 1937,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg',
    progress: 62,
    rating: 5,
    list: 'currentlyReading',
  },

  {
    id: '2',
    title: 'A Court of Thorns and Roses',
    authors: ['Sarah J. Maas'],
    firstPublishYear: 2015,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781619634442-M.jpg',
    progress: 24,
    rating: 4,
    list: 'currentlyReading',
  },

  {
    id: '6',
    title: 'Fourth Wing',
    authors: ['Rebecca Yarros'],
    firstPublishYear: 2023,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781649374042-M.jpg',
    progress: 45,
    list: 'currentlyReading',
  },

  {
    id: '7',
    title: 'The Seven Husbands of Evelyn Hugo',
    authors: ['Taylor Jenkins Reid'],
    firstPublishYear: 2017,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781501161933-M.jpg',
    progress: 71,
    list: 'currentlyReading',
  },

  {
    id: '8',
    title: 'Dune',
    authors: ['Frank Herbert'],
    firstPublishYear: 1965,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg',
    progress: 33,
    list: 'currentlyReading',
  },

  {
    id: '9',
    title: 'The Cruel Prince',
    authors: ['Holly Black'],
    firstPublishYear: 2018,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780316310314-M.jpg',
    progress: 18,
    list: 'currentlyReading',
  },

  // Finished
  {
    id: '3',
    title: 'The Midnight Library',
    authors: ['Matt Haig'],
    firstPublishYear: 2020,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg',
    rating: 4,
    list: 'finished',
  },

  {
    id: '10',
    title: 'The Great Gatsby',
    authors: ['F. Scott Fitzgerald'],
    firstPublishYear: 1925,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '11',
    title: 'Pride and Prejudice',
    authors: ['Jane Austen'],
    firstPublishYear: 1813,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '12',
    title: 'The Book Thief',
    authors: ['Markus Zusak'],
    firstPublishYear: 2005,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780375842207-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '13',
    title: 'Circe',
    authors: ['Madeline Miller'],
    firstPublishYear: 2018,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780316556347-M.jpg',
    rating: 4,
    list: 'finished',
  },

  {
    id: '14',
    title: 'The Alchemist',
    authors: ['Paulo Coelho'],
    firstPublishYear: 1988,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg',
    rating: 4,
    list: 'finished',
  },

  // Wishlist
  {
    id: '4',
    title: 'Project Hail Mary',
    authors: ['Andy Weir'],
    firstPublishYear: 2021,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg',
    list: 'wishlist',
  },

  {
    id: '15',
    title: 'The House in the Cerulean Sea',
    authors: ['TJ Klune'],
    firstPublishYear: 2020,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250217288-M.jpg',
    list: 'wishlist',
  },

  {
    id: '16',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    authors: ['Gabrielle Zevin'],
    firstPublishYear: 2022,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593321201-M.jpg',
    list: 'wishlist',
  },

  {
    id: '17',
    title: 'A Man Called Ove',
    authors: ['Fredrik Backman'],
    firstPublishYear: 2012,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781476738017-M.jpg',
    list: 'wishlist',
  },

  {
    id: '18',
    title: 'The Invisible Life of Addie LaRue',
    authors: ['V.E. Schwab'],
    firstPublishYear: 2020,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780765387561-M.jpg',
    list: 'wishlist',
  },

  {
    id: '19',
    title: 'The Priory of the Orange Tree',
    authors: ['Samantha Shannon'],
    firstPublishYear: 2019,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781635570298-M.jpg',
    list: 'wishlist',
  },

  // Bookshelf
  {
    id: '5',
    title: 'The Name of the Wind',
    authors: ['Patrick Rothfuss'],
    firstPublishYear: 2007,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780756404741-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '20',
    title: 'Harry Potter and the Sorcerer’s Stone',
    authors: ['J.K. Rowling'],
    firstPublishYear: 1997,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '21',
    title: 'The Hunger Games',
    authors: ['Suzanne Collins'],
    firstPublishYear: 2008,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '22',
    title: 'Little Women',
    authors: ['Louisa May Alcott'],
    firstPublishYear: 1868,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780147514011-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '23',
    title: 'The Ocean at the End of the Lane',
    authors: ['Neil Gaiman'],
    firstPublishYear: 2013,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062255655-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '24',
    title: 'Good Omens',
    authors: ['Neil Gaiman'],
    firstPublishYear: 1990,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780060853983-M.jpg',
    list: 'bookshelf',
  },

  // Recommendations
  {
    id: '25',
    title: 'The Poppy War',
    authors: ['R.F. Kuang'],
    firstPublishYear: 2018,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062662583-M.jpg',
    list: 'recommendations',
  },

  {
    id: '26',
    title: 'Station Eleven',
    authors: ['Emily St. John Mandel'],
    firstPublishYear: 2014,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780804172448-M.jpg',
    list: 'recommendations',
  },

  {
    id: '27',
    title: 'The Night Circus',
    authors: ['Erin Morgenstern'],
    firstPublishYear: 2011,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780307744432-M.jpg',
    list: 'recommendations',
  },

  {
    id: '28',
    title: 'Klara and the Sun',
    authors: ['Kazuo Ishiguro'],
    firstPublishYear: 2021,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593396561-M.jpg',
    list: 'recommendations',
  },

  {
    id: '29',
    title: 'Legends & Lattes',
    authors: ['Travis Baldree'],
    firstPublishYear: 2022,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250886088-M.jpg',
    list: 'recommendations',
  },

  {
    id: '30',
    title: 'The Very Secret Society of Irregular Witches',
    authors: ['Sangu Mandanna'],
    firstPublishYear: 2022,
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250244044-M.jpg',
    list: 'recommendations',
  },
];
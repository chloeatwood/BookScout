import { Book } from '@/types/book';

export const sampleBooks: Book[] = [
  // Currently Reading
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
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780547928227-M.jpg',
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
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781619634442-M.jpg',
    progress: 24,
    list: 'currentlyReading',
  },

  {
    id: '6',
    title: 'Fourth Wing',
    author: 'Rebecca Yarros',
    description:
      'A young woman is forced into a brutal dragon-riding academy where survival is anything but guaranteed.',
    genre: 'Fantasy',
    pages: 528,
    publishedYear: 2023,
    isbn: '9781649374042',
    coverColor: '#3A1F2D',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781649374042-M.jpg',
    progress: 45,
    list: 'currentlyReading',
  },

  {
    id: '7',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    description:
      'A reclusive Hollywood star finally reveals the secrets behind her glamorous and complicated life.',
    genre: 'Fiction',
    pages: 400,
    publishedYear: 2017,
    isbn: '9781501161933',
    coverColor: '#6B3E4B',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781501161933-M.jpg',
    progress: 71,
    list: 'currentlyReading',
  },

  {
    id: '8',
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'A young nobleman must navigate politics, prophecy, and survival on the dangerous desert planet Arrakis.',
    genre: 'Science Fiction',
    pages: 688,
    publishedYear: 1965,
    isbn: '9780441172719',
    coverColor: '#B07D3C',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780441172719-M.jpg',
    progress: 33,
    list: 'currentlyReading',
  },

  {
    id: '9',
    title: 'The Cruel Prince',
    author: 'Holly Black',
    description:
      'A mortal girl becomes entangled in the dangerous politics of the faerie world.',
    genre: 'Fantasy',
    pages: 370,
    publishedYear: 2018,
    isbn: '9780316310314',
    coverColor: '#241B2F',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780316310314-M.jpg',
    progress: 18,
    list: 'currentlyReading',
  },

  // Finished
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
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg',
    rating: 4,
    list: 'finished',
  },

  {
    id: '10',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      'A mysterious millionaire throws extravagant parties while pursuing a lost love.',
    genre: 'Classic',
    pages: 180,
    publishedYear: 1925,
    isbn: '9780743273565',
    coverColor: '#263A5B',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '11',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'Elizabeth Bennet navigates family expectations, social class, and an unexpected romance.',
    genre: 'Romance',
    pages: 432,
    publishedYear: 1813,
    isbn: '9780141439518',
    coverColor: '#7B5E57',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780141439518-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '12',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    description:
      'A young girl finds comfort in books while growing up in Nazi Germany.',
    genre: 'Historical Fiction',
    pages: 592,
    publishedYear: 2005,
    isbn: '9780375842207',
    coverColor: '#4A3028',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780375842207-M.jpg',
    rating: 5,
    list: 'finished',
  },

  {
    id: '13',
    title: 'Circe',
    author: 'Madeline Miller',
    description:
      'The legendary witch Circe discovers her own power while living among gods and mortals.',
    genre: 'Fantasy',
    pages: 393,
    publishedYear: 2018,
    isbn: '9780316556347',
    coverColor: '#3D5966',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780316556347-M.jpg',
    rating: 4,
    list: 'finished',
  },

  {
    id: '14',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      'A young shepherd travels across the world in search of a treasure and discovers something greater.',
    genre: 'Fiction',
    pages: 208,
    publishedYear: 1988,
    isbn: '9780062315007',
    coverColor: '#A66B32',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg',
    rating: 4,
    list: 'finished',
  },

  // Wishlist
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
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg',
    list: 'wishlist',
  },

  {
    id: '15',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    description:
      'A quiet caseworker discovers an extraordinary group of magical children living in a mysterious orphanage.',
    genre: 'Fantasy',
    pages: 396,
    publishedYear: 2020,
    isbn: '9781250217288',
    coverColor: '#5D8295',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250217288-M.jpg',
    list: 'wishlist',
  },

  {
    id: '16',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    description:
      'Two childhood friends build a remarkable career creating video games together.',
    genre: 'Fiction',
    pages: 416,
    publishedYear: 2022,
    isbn: '9780593321201',
    coverColor: '#C47A62',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593321201-M.jpg',
    list: 'wishlist',
  },

  {
    id: '17',
    title: 'A Man Called Ove',
    author: 'Fredrik Backman',
    description:
      'A grumpy widower finds his carefully controlled life changed by the unexpected arrival of new neighbors.',
    genre: 'Fiction',
    pages: 337,
    publishedYear: 2012,
    isbn: '9781476738017',
    coverColor: '#536B55',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781476738017-M.jpg',
    list: 'wishlist',
  },

  {
    id: '18',
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    description:
      'A young woman makes a supernatural bargain that allows her to live forever but be forgotten by everyone she meets.',
    genre: 'Fantasy',
    pages: 448,
    publishedYear: 2020,
    isbn: '9780765387561',
    coverColor: '#29253D',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780765387561-M.jpg',
    list: 'wishlist',
  },

  {
    id: '19',
    title: 'The Priory of the Orange Tree',
    author: 'Samantha Shannon',
    description:
      'Queens, dragons, and ancient magic collide in a vast fantasy world on the brink of war.',
    genre: 'Fantasy',
    pages: 848,
    publishedYear: 2019,
    isbn: '9781635570298',
    coverColor: '#6C4B3E',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781635570298-M.jpg',
    list: 'wishlist',
  },

  // Bookshelf
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
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780756404741-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '20',
    title: 'Harry Potter and the Sorcerer’s Stone',
    author: 'J.K. Rowling',
    description:
      'A young boy discovers that he is a wizard and begins his first year at Hogwarts.',
    genre: 'Fantasy',
    pages: 309,
    publishedYear: 1997,
    isbn: '9780590353427',
    coverColor: '#3B3D6B',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780590353427-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '21',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    description:
      'A teenage girl volunteers to compete in a deadly televised competition to save her sister.',
    genre: 'Science Fiction',
    pages: 374,
    publishedYear: 2008,
    isbn: '9780439023481',
    coverColor: '#343D2D',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780439023481-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '22',
    title: 'Little Women',
    author: 'Louisa May Alcott',
    description:
      'Four sisters grow up together while navigating love, ambition, family, and adulthood.',
    genre: 'Classic',
    pages: 759,
    publishedYear: 1868,
    isbn: '9780147514011',
    coverColor: '#705A47',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780147514011-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '23',
    title: 'The Ocean at the End of the Lane',
    author: 'Neil Gaiman',
    description:
      'A man returns to his childhood home and remembers a mysterious girl and the strange world she showed him.',
    genre: 'Fantasy',
    pages: 181,
    publishedYear: 2013,
    isbn: '9780062255655',
    coverColor: '#304B59',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062255655-M.jpg',
    list: 'bookshelf',
  },

  {
    id: '24',
    title: 'Good Omens',
    author: 'Neil Gaiman',
    description:
      'An angel and demon reluctantly team up to prevent the apocalypse.',
    genre: 'Fantasy',
    pages: 432,
    publishedYear: 1990,
    isbn: '9780060853983',
    coverColor: '#6A3434',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780060853983-M.jpg',
    list: 'bookshelf',
  },

  // Recommendations
  {
    id: '25',
    title: 'The Poppy War',
    author: 'R.F. Kuang',
    description:
      'An orphan discovers a rare talent for shamanism and becomes caught in a devastating war.',
    genre: 'Fantasy',
    pages: 544,
    publishedYear: 2018,
    isbn: '9780062662583',
    coverColor: '#542D2D',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780062662583-M.jpg',
    list: 'recommendations',
  },

  {
    id: '26',
    title: 'Station Eleven',
    author: 'Emily St. John Mandel',
    description:
      'A traveling theater troupe moves through a post-apocalyptic world trying to preserve art and humanity.',
    genre: 'Science Fiction',
    pages: 352,
    publishedYear: 2014,
    isbn: '9780804172448',
    coverColor: '#485A4B',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780804172448-M.jpg',
    list: 'recommendations',
  },

  {
    id: '27',
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    description:
      'A mysterious circus appears without warning and becomes the stage for a magical competition.',
    genre: 'Fantasy',
    pages: 516,
    publishedYear: 2011,
    isbn: '9780307744432',
    coverColor: '#25233B',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780307744432-M.jpg',
    list: 'recommendations',
  },

  {
    id: '28',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    description:
      'An artificial friend observes the world while waiting for the child who will choose her.',
    genre: 'Science Fiction',
    pages: 303,
    publishedYear: 2021,
    isbn: '9780593396561',
    coverColor: '#8B7565',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9780593396561-M.jpg',
    list: 'recommendations',
  },

  {
    id: '29',
    title: 'Legends & Lattes',
    author: 'Travis Baldree',
    description:
      'A retired adventurer opens a coffee shop and discovers that a peaceful life may be its own kind of adventure.',
    genre: 'Fantasy',
    pages: 304,
    publishedYear: 2022,
    isbn: '9781250886088',
    coverColor: '#7A5945',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250886088-M.jpg',
    list: 'recommendations',
  },

  {
    id: '30',
    title: 'The Very Secret Society of Irregular Witches',
    author: 'Sangu Mandanna',
    description:
      'A solitary witch finds an unexpected family when she is invited to teach magic at a mysterious house.',
    genre: 'Fantasy',
    pages: 336,
    publishedYear: 2022,
    isbn: '9781250244044',
    coverColor: '#59684E',
    coverUrl:
      'https://covers.openlibrary.org/b/isbn/9781250244044-M.jpg',
    list: 'recommendations',
  },
];
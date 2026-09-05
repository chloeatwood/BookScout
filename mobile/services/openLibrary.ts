export type Book = {
    id: string;
    title: string;
    authors: string[];
    coverUrl?: string;
    firstPublishYear?: number;
};

type OpenLibraryBook = {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
};

type OpenLibraryResponse = {
    docs: OpenLibraryBook[];
};

type OpenLibraryAuthor = {
    key: string;
    name: string;
};

type OpenLibraryAuthorResponse = {
    docs: OpenLibraryAuthor[];
};

async function searchBookTitles(query: string): Promise<Book[]> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent( query.trim() )}&limit=20`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Failed to search for books");
    }

    const data: OpenLibraryResponse = await response.json();

    return data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        authors: book.author_name ?? ["Unkown Author"],
        coverUrl: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : undefined,
        firstPublishYear: book.first_publish_year,
    }));
}

async function searchAuthors(query: string): Promise<Book[]> {
    const authorUrl = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent( query.trim() )}`;

    const authorResponse = await fetch(authorUrl);

    if (!authorResponse.ok) {
        throw new Error('Failed to search for authors');
    }

    const authorData: OpenLibraryAuthorResponse = await authorResponse.json();

    if (authorData.docs.length === 0) {
        return [];
    }

    const author = authorData.docs[0];

    const worksUrl = `https://openlibrary.org/authors/${author.key.replace( '/authors/', '' )}/works.json?limit=20`;

    const worksResponse = await fetch(worksUrl);

    if (!worksResponse.ok) {
        throw new Error("Failed to find books by author");
    }

    const worksData = await worksResponse.json();

    return (worksData.entries ?? []).map((book: any) => ({
        id: book.key,
        title: book.title,
        authors: [author.name],
        coverUrl: book.covers?.[0] ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg` : undefined,
        firstPublishYear: book.first_publish_year,
    }));

}

export async function searchBooks(query: string): Promise<Book[]> {
    if(!query.trim()){
        return [];
    }

    //Search using book title
    const bookResults = await searchBookTitles(query);

    if(bookResults.length > 0){
        return bookResults;
    }

    //If there where no books, search by author
    return await searchAuthors(query);
}

export async function searchBookByISBN(isbn: string): Promise<Book[]> {
    const cleanedISBN = isbn.replace(/[-\s]/g, '');

    if(!cleanedISBN){
        return [];
    }

      const url = `https://openlibrary.org/search.json?isbn=${encodeURIComponent(
        cleanedISBN
        )}&limit=20`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Failed to search for book by ISBN");
    }

    const data: OpenLibraryResponse = await response.json();

    return data.docs.map((book) => ({
        id: book.key,
        title: book.title,
        authors: book.author_name ?? ['Unknown Author'],
        coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : undefined,
        firstPublishYear: book.first_publish_year,
    }));
}
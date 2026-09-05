import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';

import { colors } from '@/constants/Colors';
import type { Book } from '@/services/openLibrary';
import { searchBooks } from '@/services/openLibrary';
import { router } from 'expo-router';

export default function FinderScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await searchBooks(searchQuery);
      setBooks(results);
    } catch (error) {
      console.error(error);
      setError('Something went wrong while searching. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  function handlePopularSearch(genre: string) {
    setSearchQuery(genre);

    // Search immediately when a popular search is selected.
    searchBooks(genre)
      .then((results) => {
        setBooks(results);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong while searching. Please try again.');
        setBooks([]);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Find a Book</Text>

        <Text style={styles.subtitle}>
          Search for a book and discover the best places to buy it.
        </Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {/* <Ionicons
            name="search-outline"
            size={22}
            color={colors.gray}
          /> */}


          <Pressable onPress={handleSearch}>
            <Ionicons
              name="search"
              size={24}
              color={colors.forest}
            />
          </Pressable>

          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or author..."
            placeholderTextColor={colors.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />

          <Pressable>
            <Ionicons
              name="barcode-outline"
              size={24}
              color={colors.forest}
            />
          </Pressable>
        </View>

        {/* Popular Searches */}
        {books.length === 0 && !loading && (
          <>
            <Text style={styles.sectionTitle}>
              Popular Searches
            </Text>

            <View style={styles.tagsContainer}>
              {[
                'Fantasy',
                'Mystery',
                'Science Fiction',
                'Romance',
                'Classics',
              ].map((genre) => (
                <Pressable
                  key={genre}
                  style={styles.tag}
                  onPress={() => handlePopularSearch(genre)}
                >
                  <Text style={styles.tagText}>
                    {genre}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {/* Loading */}
        {loading && (
          <View style={styles.loadingState}>
            <ActivityIndicator
              size="large"
              color={colors.forest}
            />

            <Text style={styles.loadingText}>
              Searching for books...
            </Text>
          </View>
        )}

        {/* Error */}
        {!loading && error !== '' && (
          <View style={styles.messageState}>
            <Ionicons
              name="alert-circle-outline"
              size={48}
              color={colors.sage}
            />

            <Text style={styles.emptyTitle}>
              Search failed
            </Text>

            <Text style={styles.emptyText}>
              {error}
            </Text>
          </View>
        )}

        {/* Search Results */}
        {!loading && error === '' && books.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>
              Search Results
            </Text>

            {books.map((book) => (
              <Pressable
                key={book.id}
                style={styles.bookCard}
                onPress={() =>
                  router.push({
                    pathname: '/book-details',
                    params: {
                      id: book.id,
                      title: book.title,
                      authors: book.authors.join(', '),
                      coverUrl: book.coverUrl ?? '',
                      firstPublishYear: book.firstPublishYear?.toString() ?? '',
                    }
                  })
                }
              >
                {book.coverUrl ? (
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.bookCover}
                  />
                ) : (
                  <View style={styles.bookCoverPlaceholder}>
                    <Ionicons
                      name="book-outline"
                      size={30}
                      color={colors.sage}
                    />
                  </View>
                )}

                <View style={styles.bookInfo}>
                  <Text
                    style={styles.bookTitle}
                    numberOfLines={2}
                  >
                    {book.title}
                  </Text>

                  <Text
                    style={styles.bookAuthor}
                    numberOfLines={2}
                  >
                    {book.authors.join(', ')}
                  </Text>

                  {book.firstPublishYear && (
                    <Text style={styles.bookYear}>
                      First published {book.firstPublishYear}
                    </Text>
                  )}
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                />
              </Pressable>
            ))}
          </View>
        )}

        {/* No Results */}
        {!loading &&
          error === '' &&
          searchQuery.trim() !== '' &&
          books.length === 0 && (
            <View style={styles.messageState}>
              <Ionicons
                name="search-outline"
                size={64}
                color={colors.sage}
              />

              <Text style={styles.emptyTitle}>
                No books found
              </Text>

              <Text style={styles.emptyText}>
                Try searching for a different title or author.
              </Text>
            </View>
          )}

        {/* Initial Empty State */}
        {!loading &&
          error === '' &&
          searchQuery.trim() === '' &&
          books.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="compass-outline"
                size={64}
                color={colors.sage}
              />

              <Text style={styles.emptyTitle}>
                Start scouting
              </Text>

              <Text style={styles.emptyText}>
                Search for a book above to compare prices
                across different stores.
              </Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 8,
    lineHeight: 22,
  },

  searchContainer: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.dark,
    // marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 32,
    marginBottom: 14,
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  tag: {
    backgroundColor: colors.sage,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  tagText: {
    color: colors.forest,
    fontWeight: '600',
    fontSize: 13,
  },

  loadingState: {
    alignItems: 'center',
    marginTop: 70,
  },

  loadingText: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 14,
  },

  resultsContainer: {
    marginTop: 4,
  },

  bookCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },

  bookCoverPlaceholder: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest,
  },

  bookAuthor: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 5,
  },

  bookYear: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 6,
  },

  messageState: {
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 30,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 16,
  },

  emptyText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
});
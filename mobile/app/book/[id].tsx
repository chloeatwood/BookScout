import { Ionicons } from '@expo/vector-icons';
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useCallback } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import { getCoverColor } from '@/utils/coverColor';
import { useBooks } from '@/context/BookContext';
import { supabase } from '@/utils/supabase';
import { BookList } from '@/types/book';

const listLabels: Record<BookList, string> = {
  currently_reading: 'Currently Reading',
  wishlist: 'Wishlist',
  finished: 'Finished',
  bookshelf: 'Bookshelf',
};

export default function BookDetailsScreen() {
  const { id, fromList } = useLocalSearchParams<{
    id: string;
    fromList?: BookList;
  }>();
  const insets = useSafeAreaInsets();
  const { books, refreshBooks } = useBooks();

  // Keeps this screen's data current if the book was just
  // edited (or its lists changed) elsewhere and we're
  // navigating back to it.
  useFocusEffect(
    useCallback(() => {
      void refreshBooks();
    }, [refreshBooks])
  );

  const book = books.find((item) => item.id === id);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found.</Text>
      </View>
    );
  }

  const progress =
    book.pagesRead !== undefined && book.totalPages
      ? Math.round((book.pagesRead / book.totalPages) * 100)
      : undefined;

  const handleUpdateBook = () => {
    router.push({
      pathname: '/manual-entry',
      params: {
        bookId: book.id,
        title: book.title,
        author: book.author,
        pubDate: book.pubDate ?? '',
        isbn: book.isbn ?? '',
        totalPages: book.totalPages?.toString() ?? '',
        pagesRead: book.pagesRead?.toString() ?? '',
        rating: book.rating?.toString() ?? '',
        coverUrl: book.coverUrl ?? '',
        notes: book.notes ?? '',
        lists: book.lists.join(','),
      },
    });
  };

  const removeFromList = async (list: BookList) => {
    const remainingLists = book.lists.filter((l) => l !== list);

    if (remainingLists.length > 0) {
      const { error } = await supabase
        .from('users_books')
        .update({
          lists: remainingLists,
          updated_at: new Date().toISOString(),
        })
        .eq('book_id', book.id);

      if (error) {
        Alert.alert('Something went wrong', error.message);
        return;
      }

      await refreshBooks();
      router.back();
      return;
    }

    // Not on any other list — nothing left to keep it around
    // for, so this removal deletes the book entirely.
    const { error } = await supabase
      .from('users_books')
      .delete()
      .eq('book_id', book.id);

    if (error) {
      Alert.alert('Something went wrong', error.message);
      return;
    }

    await refreshBooks();
    router.back();
  };

  const handleRemoveFromList = () => {
    if (!fromList) return;

    const willDeleteBook = book.lists.length <= 1;

    Alert.alert(
      willDeleteBook ? 'Delete this book?' : `Remove from ${listLabels[fromList]}?`,
      willDeleteBook
        ? `"${book.title}" isn't on any other list, so removing it here will delete it from your collection entirely.`
        : `"${book.title}" will be removed from ${listLabels[fromList]}. It'll stay on your other lists.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: willDeleteBook ? 'Delete' : 'Remove',
          style: 'destructive',
          onPress: () => {
            void removeFromList(fromList);
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Book Details',
          headerBackTitle: 'Back',
          headerTintColor: colors.forest,
          headerStyle: {
            backgroundColor: colors.cream,
          },
        }}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Pressable
          style={[styles.backButton, { marginTop: insets.top + 10 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.forest} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View
          style={[
            styles.cover,
            { backgroundColor: getCoverColor(book.id) },
          ]}
        >
          {book.coverUrl ? (
            <Image
              source={{ uri: book.coverUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : (
            <Ionicons
              name="book-outline"
              size={72}
              color={colors.cream}
            />
          )}
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        {book.lists.length > 0 && (
          <View style={styles.infoRow}>
            {book.lists.map((list) => (
              <View key={list} style={styles.tag}>
                <Text style={styles.tagText}>
                  {listLabels[list]}
                </Text>
              </View>
            ))}
          </View>
        )}

        {progress !== undefined && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Reading Progress</Text>
              <Text style={styles.progressValue}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        )}

        {book.rating && (
          <>
            <Text style={styles.sectionTitle}>Your Rating</Text>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= book.rating! ? 'star' : 'star-outline'}
                  size={28}
                  color={colors.brown}
                />
              ))}
            </View>
          </>
        )}

        {book.isbn && (
          <>
            <Text style={styles.sectionTitle}>ISBN</Text>
            <Text style={styles.detailText}>{book.isbn}</Text>
          </>
        )}

        {book.notes && (
          <>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.detailText}>{book.notes}</Text>
          </>
        )}

        <Pressable style={styles.updateButton} onPress={handleUpdateBook}>
          <Ionicons name="create-outline" size={22} color={colors.cream} />
          <Text style={styles.updateButtonText}>Update Book</Text>
        </Pressable>

        {fromList && (
          <Pressable style={styles.removeButton} onPress={handleRemoveFromList}>
            <Ionicons name="remove-circle-outline" size={22} color={colors.forest} />
            <Text style={styles.removeButtonText}>
              Remove from {listLabels[fromList]}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  cover: {
    width: 180,
    height: 260,
    borderRadius: 14,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },

  coverImage: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.forest,
    textAlign: 'center',
  },

  author: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 6,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },

  tag: {
    backgroundColor: colors.sage,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  tagText: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: '600',
  },

  progressCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
  },

  progressValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.forest,
  },

  progressBar: {
    height: 7,
    backgroundColor: colors.lightGray,
    borderRadius: 7,
    overflow: 'hidden',
    marginTop: 12,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.sage,
    borderRadius: 7,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 28,
    marginBottom: 12,
  },

  detailText: {
    fontSize: 15,
    color: colors.dark,
    lineHeight: 22,
    marginBottom: 8,
  },

  rating: {
    flexDirection: 'row',
    gap: 6,
  },

  errorText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: colors.forest,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.forest,
    marginLeft: 8,
  },

  updateButton: {
    height: 54,
    backgroundColor: colors.forest,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
  },

  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.cream,
  },

  removeButton: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  removeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest,
  },
});
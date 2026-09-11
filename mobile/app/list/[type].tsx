import { Stack, router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { BookListItem } from '@/components/BookListItem';
import { colors } from '@/constants/Colors';
import { useBooks } from '@/context/BookContext';
import { BookList } from '@/types/book';
import { BottomTabBar } from '@/components/BottomTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const listTitles: Record<BookList, string> = {
  currently_reading: 'Currently Reading',
  wishlist: 'Wishlist',
  finished: 'Finished',
  bookshelf: 'Bookshelf',
};

export default function BookListScreen() {
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<{ type: BookList }>();
  const { getBooksByList, refreshBooks } = useBooks();

  useFocusEffect(
    useCallback(() => {
      void refreshBooks();
    }, [refreshBooks])
  );

  const listType = type as BookList;
  const books = getBooksByList(listType);
  const title = listTitles[listType] ?? 'Books';

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title,
          headerTintColor: colors.forest,
          headerStyle: {
            backgroundColor: colors.cream,
          },
        }}
      />

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookListItem
            book={item}
            subtitle={item.author}
            list={listType}
          />
        )}
        ListHeaderComponent={
          <>
            <Pressable
              style={[styles.backButton, { marginTop: insets.top + 10 }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.forest} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>

            <Text style={styles.title}>{title}</Text>
          </>
        }
        contentContainerStyle={styles.content}
        style={styles.container}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No books in this list yet.
          </Text>
        }
      />
      <BottomTabBar />
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
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 80,
    color: colors.gray,
    fontSize: 16,
  },

  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: 16,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.forest,
    marginLeft: 8,
  },
});
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

import { BookListItem } from '@/components/BookListItem';
import { colors } from '@/constants/Colors';
import { useBooks } from '@/context/BookContext';
import { BookList } from '@/types/book';
import { BottomTabBar } from '@/components/BottomTabBar';

const listTitles: Record<BookList, string> = {
  currentlyReading: 'Currently Reading',
  wishlist: 'Wishlist',
  finished: 'Finished',
  bookshelf: 'Bookshelf',
  recommendations: 'Recommendations',
};

export default function BookListScreen() {
  const { type } =
    useLocalSearchParams<{ type: BookList }>();

  const { getBooksByList } = useBooks();

  const listType = type as BookList;
  const books = getBooksByList(listType);

  const title =
    listTitles[listType] ?? 'Books';

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
          />
        )}
        ListHeaderComponent={
          <Text style={styles.title}>{title}</Text>
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

});
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Bookshelf } from '@/components/Bookshelf';
import { colors } from '@/constants/Colors';
import { useBooks } from '@/context/BookContext';

export default function HomeScreen() {
  const { getBooksByList, refreshBooks } = useBooks();

  useFocusEffect(
    useCallback(() => {
      refreshBooks();
    }, [refreshBooks])
  );

  const currentlyReading = getBooksByList('currently_reading');
  const wishlist = getBooksByList('wishlist');
  const finished = getBooksByList('finished');
  const bookshelf = getBooksByList('bookshelf');

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetings}>
              Welcome Back!
            </Text>

            <Text style={styles.title}>
              Your BookScout
            </Text>
          </View>

          <Ionicons
            name="leaf-outline"
            size={38}
            color={colors.forest}
          />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={21}
            color={colors.gray}
          />

          <TextInput
            placeholder="Search your books..."
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View>

        <Bookshelf
          title="Currently Reading"
          icon="book-outline"
          books={currentlyReading}
          onPress={() => router.push('/list/currently_reading')}
        />

        <Bookshelf
          title="Wishlist"
          icon="heart-outline"
          books={wishlist}
          onPress={() => router.push('/list/wishlist')}
        />

        <Bookshelf
          title="Finished"
          icon="checkmark-circle-outline"
          books={finished}
          onPress={() => router.push('/list/finished')}
        />

        <Bookshelf
          title="Bookshelf"
          icon="library-outline"
          books={bookshelf}
          onPress={() => router.push('/list/bookshelf')}
        />

        {/* Recommendations shelf removed — no matching list in
            manual-entry.tsx's LIST_OPTIONS yet. Uncomment there
            first if you want this back. */}
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
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  greetings: {
    fontSize: 14,
    color: colors.gray,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 3,
  },

  searchContainer: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.dark,
  },
});
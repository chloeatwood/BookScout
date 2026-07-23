import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BookCard } from '@/components/BookCard';
import { SectionHeader } from '@/components/SectionHeader';
import { colors } from '@/constants/Colors';
import { useBooks } from '@/context/BookContext';

export default function HomeScreen() {
  const { getBooksByList } = useBooks();

  const currentlyReading =
    getBooksByList('currentlyReading');

  const wishlist =
    getBooksByList('wishlist');

  const finished =
    getBooksByList('finished');

  const bookshelf =
    getBooksByList('bookshelf');

  const recommendations =
    getBooksByList('recommendations');

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Welcome back!
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

        {/* Currently Reading */}
        <SectionHeader
          title="Currently Reading"
          list="currentlyReading"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {currentlyReading.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </ScrollView>

        {/* Wishlist */}
        <SectionHeader
          title="Wishlist"
          list="wishlist"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {wishlist.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </ScrollView>

        {/* Finished */}
        <SectionHeader
          title="Finished"
          list="finished"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {finished.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </ScrollView>

        {/* Bookshelf */}
        <SectionHeader
          title="Bookshelf"
          list="bookshelf"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {bookshelf.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </ScrollView>

        {/* Recommendations */}
        <SectionHeader
          title="Recommendations"
          list="recommendations"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {recommendations.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </ScrollView>
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

  greeting: {
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

  horizontalList: {
    paddingBottom: 4,
  },
});
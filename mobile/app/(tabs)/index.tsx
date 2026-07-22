import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { homeStyles as styles } from '@/constants/HomeStyles';

const currentlyReading = [
  {
    id: '1',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    progress: 65,
  },
  {
    id: '2',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    progress: 32,
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    progress: 12,
  },
];

const recentFinds = [
  {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    price: '$9.99',
    store: 'Bookstore',
  },
  {
    id: '2',
    title: 'The Martian',
    author: 'Andy Weir',
    price: '$7.49',
    store: 'Bookshop',
  },
  {
    id: '3',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: '$8.99',
    store: 'Books Online',
  },
];

const wishlist = [
  {
    id: '1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: '$14.99',
  },
  {
    id: '2',
    title: 'Mistborn',
    author: 'Brandon Sanderson',
    price: '$10.49',
  },
  {
    id: '3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: '$11.99',
  },
];


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.title}>BookScout</Text>
          </View>

          <View style={styles.profilePlaceholder}>
            <Ionicons
              name="person-outline"
              size={22}
              color={colors.forest}
            />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={22}
            color={colors.gray}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search for a book..."
            placeholderTextColor={colors.gray}
          />

          <Pressable style={styles.scanButton}>
            <Ionicons
              name="barcode-outline"
              size={22}
              color={colors.forest}
            />
          </Pressable>
        </View>

        {/* Currently Reading */}
        <SectionHeader
          title="Currently Reading"
          action="View All"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {currentlyReading.map((book) => (
            <Pressable
              key={book.id}
              style={styles.readingCard}
            >
              <View style={styles.bookCover}>
                <Ionicons
                  name="book-outline"
                  size={38}
                  color={colors.cream}
                />
              </View>

              <Text
                style={styles.bookTitle}
                numberOfLines={2}
              >
                {book.title}
              </Text>

              <Text
                style={styles.author}
                numberOfLines={1}
              >
                {book.author}
              </Text>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${book.progress}%` },
                  ]}
                />
              </View>

              <Text style={styles.progressText}>
                {book.progress}% complete
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Recent Finds */}
        <SectionHeader
          title="Recent Finds"
          action="See More"
        />

        <View style={styles.listContainer}>
          {recentFinds.map((book) => (
            <Pressable
              key={book.id}
              style={styles.listCard}
            >
              <View style={styles.smallBookCover}>
                <Ionicons
                  name="book-outline"
                  size={26}
                  color={colors.cream}
                />
              </View>

              <View style={styles.listInfo}>
                <Text
                  style={styles.listTitle}
                  numberOfLines={1}
                >
                  {book.title}
                </Text>

                <Text
                  style={styles.author}
                  numberOfLines={1}
                >
                  {book.author}
                </Text>

                <Text style={styles.store}>
                  Best price at {book.store}
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {book.price}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Wishlist */}
        <SectionHeader
          title="Your Wishlist"
          action="View All"
        />

        <View style={styles.listContainer}>
          {wishlist.map((book) => (
            <Pressable
              key={book.id}
              style={styles.listCard}
            >
              <View
                style={[
                  styles.smallBookCover,
                  styles.wishlistCover,
                ]}
              >
                <Ionicons
                  name="heart-outline"
                  size={26}
                  color={colors.forest}
                />
              </View>

              <View style={styles.listInfo}>
                <Text
                  style={styles.listTitle}
                  numberOfLines={1}
                >
                  {book.title}
                </Text>

                <Text
                  style={styles.author}
                  numberOfLines={1}
                >
                  {book.author}
                </Text>

                <Text style={styles.store}>
                  Current lowest price
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {book.price}
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.gray}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Pressable>
        <Text style={styles.sectionAction}>
          {action}
        </Text>
      </Pressable>
    </View>
  );
}
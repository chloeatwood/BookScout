import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';

export default function FinderScreen() {
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

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={22}
            color={colors.gray}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or author..."
            placeholderTextColor={colors.gray}
          />

          <Pressable>
            <Ionicons
              name="barcode-outline"
              size={24}
              color={colors.forest}
            />
          </Pressable>
        </View>

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
            >
              <Text style={styles.tagText}>
                {genre}
              </Text>
            </Pressable>
          ))}
        </View>

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
    marginLeft: 10,
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
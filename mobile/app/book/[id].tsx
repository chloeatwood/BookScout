import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { sampleBooks } from '@/data/sampleBooks';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams();

  const book = sampleBooks.find(
    (item) => item.id === id
  );

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Book not found.
        </Text>
      </View>
    );
  }

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

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.cover,
            {
              backgroundColor:
                book.coverColor ?? colors.forest,
            },
          ]}
        >
          <Ionicons
            name="book-outline"
            size={72}
            color={colors.cream}
          />
        </View>

        <Text style={styles.title}>
          {book.title}
        </Text>

        <Text style={styles.author}>
          {book.author}
        </Text>

        <View style={styles.infoRow}>
          {book.genre && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {book.genre}
              </Text>
            </View>
          )}

          {book.publishedYear && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {book.publishedYear}
              </Text>
            </View>
          )}
        </View>

        {book.progress !== undefined && (
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>
                Reading Progress
              </Text>

              <Text style={styles.progressValue}>
                {book.progress}%
              </Text>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${book.progress}%`,
                  },
                ]}
              />
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>
          About This Book
        </Text>

        <Text style={styles.description}>
          {book.description ??
            'No description available.'}
        </Text>

        <Text style={styles.sectionTitle}>
          Book Information
        </Text>

        <InfoRow
          label="Pages"
          value={
            book.pages
              ? book.pages.toString()
              : 'Unknown'
          }
        />

        <InfoRow
          label="Published"
          value={
            book.publishedYear
              ? book.publishedYear.toString()
              : 'Unknown'
          }
        />

        <InfoRow
          label="ISBN"
          value={book.isbn ?? 'Unknown'}
        />

        {book.rating && (
          <>
            <Text style={styles.sectionTitle}>
              Your Rating
            </Text>

            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={
                    star <= book.rating!
                      ? 'star'
                      : 'star-outline'
                  }
                  size={28}
                  color={colors.brown}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
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

  description: {
    fontSize: 15,
    color: colors.dark,
    lineHeight: 23,
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  infoLabel: {
    color: colors.gray,
    fontSize: 14,
  },

  infoValue: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: '600',
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
});
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/Colors';
import { sampleBooks } from '@/data/sampleBooks';
import { getCoverColor } from '@/utils/coverColor';

export default function BookDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

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
            {
              backgroundColor: getCoverColor(book.id),
            },
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

        <Text style={styles.title}>
          {book.title}
        </Text>

        <Text style={styles.author}>
          {book.authors.join(', ')}
        </Text>

        {book.firstPublishYear && (
          <View style={styles.infoRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {book.firstPublishYear}
              </Text>
            </View>
          </View>
        )}

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
});
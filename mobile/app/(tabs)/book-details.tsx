import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getCoverColor } from '@/utils/coverColor';

export default function BookDetailsScreen() {
  const insets = useSafeAreaInsets();

  const {
    id,
    title,
    authors,
    coverUrl,
    firstPublishYear,
  } = useLocalSearchParams<{
    id: string;
    title: string;
    authors: string;
    coverUrl: string;
    firstPublishYear: string;
  }>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={[styles.backButton, { marginTop: insets.top + 10 }]}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.forest}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View style={styles.bookInfo}>
          {coverUrl ? (
            <Image
              source={{ uri: coverUrl }}
              style={styles.cover}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.coverPlaceholder,
                { backgroundColor: getCoverColor(id) },
              ]}
            >
              <Ionicons
                name="book-outline"
                size={48}
                color={colors.cream}
              />
            </View>
          )}

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.authors}>
            {authors || 'Unknown Author'}
          </Text>

          {firstPublishYear ? (
            <Text style={styles.year}>
              First published {firstPublishYear}
            </Text>
          ) : null}
        </View>

        <Pressable style={styles.addButton}>
          <Ionicons
            name="add"
            size={24}
            color={colors.cream}
          />
          <Text style={styles.addButtonText}>Add to List</Text>
        </Pressable>
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
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 24,
  },

  backText: {
    fontSize: 16,
    color: colors.forest,
    fontWeight: '600',
  },

  bookInfo: {
    alignItems: 'center',
  },

  cover: {
    width: 180,
    height: 270,
    borderRadius: 12,
    marginBottom: 24,
  },

  coverPlaceholder: {
    width: 180,
    height: 270,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 8,
  },

  authors: {
    fontSize: 18,
    color: colors.forest,
    textAlign: 'center',
    marginBottom: 8,
  },

  year: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 28,
  },

  addButton: {
    height: 54,
    backgroundColor: colors.forest,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.cream,
  },
});
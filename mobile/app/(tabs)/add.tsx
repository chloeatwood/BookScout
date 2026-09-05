import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add a Book</Text>

        <Text style={styles.subtitle}>
          Add a book to your collection, wishlist, or
          reading list.
        </Text>

        <Pressable style={styles.primaryButton}
                    onPress={() => router.push('/scanner')}>
          <Ionicons
            name="barcode-outline"
            size={26}
            color={colors.cream}
          />

          <View style={styles.buttonTextContainer}>
            <Text style={styles.primaryButtonTitle}>
              Scan ISBN
            </Text>

            <Text style={styles.primaryButtonSubtitle}>
              Quickly find a book using its barcode
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.secondaryButton}
                    onPress={() => router.push('/finder')}>
          <Ionicons
            name="search-outline"
            size={26}
            color={colors.forest}
          />

          <View style={styles.buttonTextContainer}>
            <Text style={styles.secondaryButtonTitle}>
              Search for a Book
            </Text>

            <Text style={styles.secondaryButtonSubtitle}>
              Find a book by title or author
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push('/manual-entry')}
        >
          <Ionicons
            name="create-outline"
            size={26}
            color={colors.forest}
          />

          <View style={styles.buttonTextContainer}>
            <Text style={styles.secondaryButtonTitle}>
              Enter Manually
            </Text>

            <Text style={styles.secondaryButtonSubtitle}>
              Add book information yourself
            </Text>
          </View>
        </Pressable>
      </View>
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
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 30,
  },

  primaryButton: {
    backgroundColor: colors.forest,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  buttonTextContainer: {
    marginLeft: 16,
    flex: 1,
  },

  primaryButtonTitle: {
    color: colors.cream,
    fontSize: 17,
    fontWeight: '700',
  },

  primaryButtonSubtitle: {
    color: colors.sage,
    fontSize: 13,
    marginTop: 4,
  },

  secondaryButtonTitle: {
    color: colors.forest,
    fontSize: 17,
    fontWeight: '700',
  },

  secondaryButtonSubtitle: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 4,
  },
});
import { Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';

export default function ManualEntryScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Book',
          headerTintColor: colors.forest,
          headerStyle: {
            backgroundColor: colors.cream,
          },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Add a Book Manually
        </Text>

        <Text style={styles.subtitle}>
          Enter the details below to add a book to
          your BookScout collection.
        </Text>

        <FormField
          label="Title"
          placeholder="Enter book title"
        />

        <FormField
          label="Author"
          placeholder="Enter author name"
        />

        <FormField
          label="Genre"
          placeholder="e.g. Fantasy, Mystery, Romance"
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <FormField
              label="Pages"
              placeholder="Number of pages"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.halfField}>
            <FormField
              label="Published Year"
              placeholder="Year"
              keyboardType="numeric"
            />
          </View>
        </View>

        <FormField
          label="ISBN"
          placeholder="Optional"
          keyboardType="numeric"
        />

        <Text style={styles.label}>
          Description
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Add a description..."
          placeholderTextColor={colors.gray}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        <Text style={styles.label}>
          List
        </Text>

        <View style={styles.listSelector}>
          <Text style={styles.listSelectorText}>
            Choose where to add this book
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Add Book
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

function FormField({
  label,
  placeholder,
  keyboardType,
}: {
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        keyboardType={keyboardType}
      />
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

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 26,
  },

  field: {
    marginBottom: 18,
    flex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.forest,
    marginBottom: 7,
  },

  input: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.dark,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  halfField: {
    flex: 1,
  },

  textArea: {
    minHeight: 120,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 14,
    fontSize: 14,
    color: colors.dark,
    marginBottom: 20,
  },

  listSelector: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingHorizontal: 14,
    justifyContent: 'center',
    marginBottom: 24,
  },

  listSelectorText: {
    color: colors.gray,
    fontSize: 14,
  },

  button: {
    height: 52,
    backgroundColor: colors.forest,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '700',
  },
});
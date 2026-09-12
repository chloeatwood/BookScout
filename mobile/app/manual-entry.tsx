import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { supabase } from '@/utils/supabase';

type ListKey =
  | 'currently_reading'
  | 'wishlist'
  | 'finished'
  | 'bookshelf';
  // | 'recommendations';

const LIST_OPTIONS: {
  key: ListKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  {
    key: 'currently_reading',
    label: 'Currently Reading',
    icon: 'book-outline',
  },
  {
    key: 'wishlist',
    label: 'Wishlist',
    icon: 'heart-outline',
  },
  {
    key: 'finished',
    label: 'Finished',
    icon: 'checkmark-circle-outline',
  },
  {
    key: 'bookshelf',
    label: 'Bookshelf',
    icon: 'library-outline',
  },
  // {
  //   key: 'recommendations',
  //   label: 'Recommendations',
  //   icon: 'sparkles-outline',
  // },
];

export default function ManualEntryScreen() {
  const insets = useSafeAreaInsets();
  
  const params = useLocalSearchParams<{
    // From an Open Library search/scan result
    title?: string;
    authors?: string;
    coverUrl?: string;
    firstPublishYear?: string;
    isbn?: string;
    // From editing an existing saved book
    bookId?: string;
    author?: string;
    pubDate?: string;
    totalPages?: string;
    pagesRead?: string;
    rating?: string;
    notes?: string;
    lists?: string;
  }>();

  // Three modes this screen can be in:
  // - editing: arrived via the "Update Book" button on a saved
  //   book. Every field is prefilled and editable, saving
  //   updates that specific row.
  // - fromSearch: arrived from Open Library search/scan. Title,
  //   author, and cover are prefilled and locked.
  // - blank manual entry: nothing prefilled, everything editable.
  const isEditing = Boolean(params.bookId);
  const isFromSearch = !isEditing && Boolean(params.title);

  const [title, setTitle] = useState(params.title ?? '');
  const [author, setAuthor] = useState(
    params.author ?? params.authors ?? ''
  );
  const [pubDate, setPubDate] = useState(
    params.pubDate ??
      (params.firstPublishYear
        ? `${params.firstPublishYear}-01-01`
        : '')
  );
  const [isbn, setIsbn] = useState(params.isbn ?? '');
  const [totalPages, setTotalPages] = useState(
    params.totalPages ?? ''
  );
  const [pagesRead, setPagesRead] = useState(
    params.pagesRead ?? ''
  );
  const [rating, setRating] = useState(
    params.rating ? Number(params.rating) : 0
  );
  const [coverUrl, setCoverUrl] = useState(
    params.coverUrl ?? ''
  );
  const [notes, setNotes] = useState(params.notes ?? '');
  const [selectedLists, setSelectedLists] = useState<ListKey[]>(
    params.lists
      ? (params.lists.split(',').filter(Boolean) as ListKey[])
      : []
  );
  const [activeTooltip, setActiveTooltip] =
    useState<ListKey | null>(null);
  const [saving, setSaving] = useState(false);

  // Rebuilds the form from scratch every time this screen
  // regains focus, so nothing lingers from a previous visit.
  // What it rebuilds to depends on the mode we're in.
  const applyFreshState = useCallback(() => {
    if (isEditing) {
      setTitle(params.title ?? '');
      setAuthor(params.author ?? '');
      setPubDate(params.pubDate ?? '');
      setIsbn(params.isbn ?? '');
      setTotalPages(params.totalPages ?? '');
      setPagesRead(params.pagesRead ?? '');
      setRating(params.rating ? Number(params.rating) : 0);
      setCoverUrl(params.coverUrl ?? '');
      setNotes(params.notes ?? '');
      setSelectedLists(
        params.lists
          ? (params.lists.split(',').filter(Boolean) as ListKey[])
          : []
      );
      return;
    }

    setTitle(params.title ?? '');
    setAuthor(params.authors ?? '');
    setPubDate(
      params.firstPublishYear
        ? `${params.firstPublishYear}-01-01`
        : ''
    );
    setCoverUrl(params.coverUrl ?? '');
    setIsbn(params.isbn ?? '');
    setTotalPages('');
    setPagesRead('');
    setRating(0);
    setNotes('');
    setSelectedLists([]);
  }, [
    isEditing,
    params.title,
    params.author,
    params.authors,
    params.coverUrl,
    params.firstPublishYear,
    params.isbn,
    params.bookId,
    params.pubDate,
    params.totalPages,
    params.pagesRead,
    params.rating,
    params.notes,
    params.lists,
  ]);

  useFocusEffect(
    useCallback(() => {
      applyFreshState();
    }, [applyFreshState])
  );

  const toggleList = (key: ListKey) => {
    setSelectedLists((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  const handleAddBook = async () => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    const trimmedTotalPages = totalPages.trim();

    const missing: string[] = [];
    if (!trimmedTitle) missing.push('Title');
    if (!trimmedAuthor) missing.push('Author');
    if (!trimmedTotalPages) missing.push('Total Pages');
    if (selectedLists.length === 0)
      missing.push('at least one List');

    if (missing.length > 0) {
      Alert.alert(
        'Missing info',
        `Please fill in: ${missing.join(', ')}.`
      );
      return;
    }

    const parsedTotalPages = Number(trimmedTotalPages);
    const parsedPagesRead = pagesRead
      ? Number(pagesRead)
      : 0;

    if (parsedPagesRead > parsedTotalPages) {
      Alert.alert(
        'Check your page count',
        'Pages read can\'t be more than total pages.'
      );
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert(
        'Not signed in',
        'Please sign in again and retry.'
      );
      return;
    }

    setSaving(true);

    const trimmedIsbn = isbn.trim();

    // Editing an existing book: update that exact row directly.
    // No dedupe/merge logic needed — we already know which row
    // this is, and the lists should end up as exactly what's
    // selected now (not merged with the old values).
    if (isEditing && params.bookId) {
      const { error: updateError } = await supabase
        .from('users_books')
        .update({
          title: trimmedTitle,
          author: trimmedAuthor,
          pub_date: pubDate.trim() || null,
          isbn: trimmedIsbn || null,
          total_pages: parsedTotalPages,
          pages_read: parsedPagesRead,
          rating: rating > 0 ? rating : null,
          cover_url: coverUrl.trim() || null,
          personal_notes: notes.trim() || null,
          lists: selectedLists,
          updated_at: new Date().toISOString(),
        })
        .eq('book_id', params.bookId)
        .eq('user_id', user.id);

      setSaving(false);

      if (updateError) {
        Alert.alert('Something went wrong', updateError.message);
        return;
      }

      Alert.alert('Updated!', `"${trimmedTitle}" was updated.`);
      router.back();
      return;
    }

    // Look for an existing copy of this book for this user.
    // Prefer an ISBN match when we have one — it's exact and
    // survives things like "J.K. Rowling" vs "JK Rowling".
    // Fall back to title + author (case-insensitive) when
    // there's no ISBN to go on.
    let existing: { book_id: string; lists: ListKey[] } | null =
      null;

    if (trimmedIsbn) {
      const { data, error: isbnLookupError } = await supabase
        .from('users_books')
        .select('book_id, lists')
        .eq('user_id', user.id)
        .eq('isbn', trimmedIsbn)
        .limit(1);

      if (isbnLookupError) {
        setSaving(false);
        Alert.alert('Something went wrong', isbnLookupError.message);
        return;
      }

      existing = data?.[0] ?? null;
    }

    if (!existing) {
      const { data, error: lookupError } = await supabase
        .from('users_books')
        .select('book_id, lists')
        .eq('user_id', user.id)
        .ilike('title', trimmedTitle)
        .ilike('author', trimmedAuthor)
        .limit(1);

      if (lookupError) {
        setSaving(false);
        Alert.alert('Something went wrong', lookupError.message);
        return;
      }

      existing = data?.[0] ?? null;
    }

    if (existing) {
      const mergedLists = Array.from(
        new Set([...existing.lists, ...selectedLists])
      );

      const { error: updateError } = await supabase
        .from('users_books')
        .update({
          title: trimmedTitle,
          author: trimmedAuthor,
          pub_date: pubDate.trim() || null,
          isbn: trimmedIsbn || null,
          total_pages: parsedTotalPages,
          pages_read: parsedPagesRead,
          rating: rating > 0 ? rating : null,
          cover_url: coverUrl.trim() || null,
          personal_notes: notes.trim() || null,
          lists: mergedLists,
          updated_at: new Date().toISOString(),
        })
        .eq('book_id', existing.book_id);

      setSaving(false);

      if (updateError) {
        Alert.alert('Something went wrong', updateError.message);
        return;
      }

      Alert.alert(
        'Already in your collection',
        `"${trimmedTitle}" was already saved \u2014 updated its details and added it to the selected list(s).`
      );
      applyFreshState();

      if (isFromSearch) {
        router.back();
      }

      return;
    }

    const { error: insertError } = await supabase
      .from('users_books')
      .insert({
        user_id: user.id,
        title: trimmedTitle,
        author: trimmedAuthor,
        pub_date: pubDate.trim() || null,
        isbn: trimmedIsbn || null,
        total_pages: parsedTotalPages,
        pages_read: parsedPagesRead,
        rating: rating > 0 ? rating : null,
        cover_url: coverUrl.trim() || null,
        personal_notes: notes.trim() || null,
        lists: selectedLists,
      });

    setSaving(false);

    if (insertError) {
      // 23505 = unique_violation. Covers the rare race where
      // the same book was added in the moment between our
      // lookup above and this insert.
      if (insertError.code === '23505') {
        Alert.alert(
          'Already in your collection',
          `"${trimmedTitle}" was just added elsewhere. Try again to update its lists instead.`
        );
      } else {
        Alert.alert(
          'Something went wrong',
          insertError.message
        );
      }
      return;
    }

    Alert.alert('Added!', `"${trimmedTitle}" was added to your collection.`);
    applyFreshState();

    if (isFromSearch) {
      router.back();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? 'Update Book' : 'Add Book',
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

        <Pressable
          style={[
            styles.backButton,
            { marginTop: insets.top + 10 },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={colors.forest}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>
          {isEditing
            ? 'Update Book'
            : isFromSearch
              ? 'Add This Book'
              : 'Add a Book Manually'}
        </Text>

        <Text style={styles.subtitle}>
          {isEditing
            ? 'Make your changes below and save.'
            : isFromSearch
              ? 'These details came from Open Library and can\u2019t be edited. Fill in the rest below.'
              : 'Enter the details below to add a book to your BookScout collection.'}
        </Text>

        {isFromSearch && (
          <View style={styles.sourceCard}>
            {coverUrl ? (
              <Image
                source={{ uri: coverUrl }}
                style={styles.sourceCover}
              />
            ) : (
              <View style={styles.sourceCoverPlaceholder}>
                <Ionicons
                  name="book-outline"
                  size={28}
                  color={colors.sage}
                />
              </View>
            )}

            <View style={styles.sourceInfo}>
              <Text
                style={styles.sourceBadge}
              >
                FROM OPEN LIBRARY
              </Text>

              <Text
                style={styles.sourceTitle}
                numberOfLines={2}
              >
                {title}
              </Text>

              <Text
                style={styles.sourceAuthor}
                numberOfLines={1}
              >
                {author || 'Unknown Author'}
              </Text>
            </View>
          </View>
        )}

        {!isFromSearch && (
          <>
            <FormField
              label="Title *"
              placeholder="Enter book title"
              value={title}
              onChangeText={setTitle}
            />

            <FormField
              label="Author *"
              placeholder="Enter author name"
              value={author}
              onChangeText={setAuthor}
            />
          </>
        )}

        <View style={styles.row}>
          <View style={styles.halfField}>
            <FormField
              label="Published Date"
              placeholder="YYYY-MM-DD"
              value={pubDate}
              onChangeText={setPubDate}
              editable={!isFromSearch}
            />
          </View>

          <View style={styles.halfField}>
            <FormField
              label="ISBN"
              placeholder="Optional"
              keyboardType="numeric"
              value={isbn}
              onChangeText={setIsbn}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            <FormField
              label="Total Pages *"
              placeholder="e.g. 320"
              keyboardType="numeric"
              value={totalPages}
              onChangeText={setTotalPages}
            />
          </View>

          <View style={styles.halfField}>
            <FormField
              label="Pages Read"
              placeholder="e.g. 0"
              keyboardType="numeric"
              value={pagesRead}
              onChangeText={setPagesRead}
            />
          </View>
        </View>

        <Text style={styles.label}>Rating</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable
              key={n}
              onPress={() =>
                setRating(rating === n ? 0 : n)
              }
              hitSlop={8}
              style={styles.starButton}
            >
              <Ionicons
                name={n <= rating ? 'star' : 'star-outline'}
                size={30}
                color={colors.forest}
              />
            </Pressable>
          ))}
        </View>

        {!isFromSearch && (
          <FormField
            label="Cover Image URL"
            placeholder="Optional"
            value={coverUrl}
            onChangeText={setCoverUrl}
          />
        )}

        <Text style={styles.label}>
          Personal Notes
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Add a note..."
          placeholderTextColor={colors.gray}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={notes}
          onChangeText={setNotes}
        />

        <Text style={styles.label}>Lists *</Text>

        <Text style={styles.listHint}>
          Tap to add to a list. Hold an icon to see
          its name.
        </Text>

        <View style={styles.listsRow}>
          {LIST_OPTIONS.map((list) => {
            const isSelected = selectedLists.includes(
              list.key
            );

            return (
              <View
                key={list.key}
                style={styles.listIconWrapper}
              >
                {activeTooltip === list.key && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      {list.label}
                    </Text>
                  </View>
                )}

                <Pressable
                  onPress={() => toggleList(list.key)}
                  onLongPress={() =>
                    setActiveTooltip(list.key)
                  }
                  onPressOut={() =>
                    setActiveTooltip(null)
                  }
                  style={[
                    styles.listIconButton,
                    isSelected &&
                      styles.listIconButtonSelected,
                  ]}
                >
                  <Ionicons
                    name={list.icon}
                    size={24}
                    color={
                      isSelected
                        ? colors.cream
                        : colors.forest
                    }
                  />
                </Pressable>
              </View>
            );
          })}
        </View>

        <Pressable
          style={[
            styles.button,
            saving && styles.buttonDisabled,
          ]}
          onPress={handleAddBook}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color={colors.cream} />
          ) : (
            <Text style={styles.buttonText}>
              {isEditing ? 'Save Changes' : 'Add Book'}
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </>
  );
}

function FormField({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  editable = true,
}: {
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric';
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
        </Text>

        {!editable && (
          <Ionicons
            name="lock-closed"
            size={12}
            color={colors.gray}
          />
        )}
      </View>

      <TextInput
        style={[
          styles.input,
          !editable && styles.inputLocked,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
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

  sourceCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    marginBottom: 22,
  },

  sourceCover: {
    width: 56,
    height: 84,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },

  sourceCoverPlaceholder: {
    width: 56,
    height: 84,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sourceInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },

  sourceBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.sage,
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  sourceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.forest,
  },

  sourceAuthor: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 3,
  },

  field: {
    marginBottom: 18,
    flex: 1,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 7,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.forest,
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

  inputLocked: {
    backgroundColor: colors.lightGray,
    color: colors.gray,
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

  starsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  starButton: {
    marginRight: 10,
  },

  listHint: {
    fontSize: 12,
    color: colors.gray,
    marginTop: -3,
    marginBottom: 12,
  },

  listsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 24,
  },

  listIconWrapper: {
    alignItems: 'center',
  },

  listIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listIconButtonSelected: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },

  tooltip: {
    position: 'absolute',
    top: -34,
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 10,
  },

  tooltipText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  button: {
    height: 52,
    backgroundColor: colors.forest,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '700',
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
});
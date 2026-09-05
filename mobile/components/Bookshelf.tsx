import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// import type { Book } from '@/services/openLibrary';
import type { Book } from '@/types/book';
import { colors } from '@/constants/Colors';

type BookshelfProps = {
  title: string;
  books: Book[];
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function Bookshelf({
  title,
  books,
  icon,
  onPress,
}: BookshelfProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.header}
        onPress={onPress}
        disabled={!onPress}
      >
        <View style={styles.titleContainer}>
          <Ionicons
            name={icon}
            size={20}
            color={colors.forest}
          />

          <Text style={styles.title}>{title}</Text>
        </View>

        {onPress && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.gray}
          />
        )}
      </Pressable>

      <View style={styles.shelf}>
        {books.length > 0 ? (
          <View style={styles.books}>
            {books.slice(0, 6).map((book, index) => (
              <View
                key={book.id}
                style={[
                  styles.book,
                  {
                    transform: [
                      {
                        rotate:
                          index % 3 === 0
                            ? '-2deg'
                            : index % 3 === 1
                              ? '1deg'
                              : '-1deg',
                      },
                    ],
                  },
                ]}
              >
                {book.coverUrl ? (
                  <Image
                    source={{ uri: book.coverUrl }}
                    style={styles.cover}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.coverPlaceholder}>
                    <Ionicons
                      name="book-outline"
                      size={18}
                      color={colors.gray}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyShelf}>
            <Ionicons
              name="library-outline"
              size={32}
              color={colors.gray}
            />

            <Text style={styles.emptyText}>
              Your shelf is empty
            </Text>
          </View>
        )}

        <View style={styles.shelfBoard} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.forest,
  },

  shelf: {
    width: '100%',
    minHeight: 150,
    justifyContent: 'flex-end',
  },

  books: {
    height: 135,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
  },

  book: {
    width: 52,
    height: 120,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.lightGray,
  },

  cover: {
    width: '100%',
    height: '100%',
  },

  coverPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },

  shelfBoard: {
    height: 12,
    width: '100%',
    backgroundColor: colors.forest,
    borderRadius: 4,
  },

  emptyShelf: {
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 6,
  },
});
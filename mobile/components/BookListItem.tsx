import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/Colors';
import { Book } from '@/types/book';

type BookListItemProps = {
  book: Book;
  subtitle?: string;
};

export function BookListItem({
  book,
  subtitle,
}: BookListItemProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/book/[id]',
          params: {
            id: book.id,
          },
        })
      }
      style={{
        minHeight: 82,
        backgroundColor: colors.white,
        borderRadius: 14,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.lightGray,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 58,
          height: 62,
          borderRadius: 9,
          backgroundColor:
            book.coverColor ?? colors.forest,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name="book-outline"
          size={26}
          color={colors.cream}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: 12,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: colors.dark,
          }}
          numberOfLines={1}
        >
          {book.title}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: colors.gray,
            marginTop: 3,
          }}
          numberOfLines={1}
        >
          {book.author}
        </Text>

        {subtitle && (
          <Text
            style={{
              fontSize: 11,
              color: colors.gray,
              marginTop: 5,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.gray}
      />
    </Pressable>
  );
}
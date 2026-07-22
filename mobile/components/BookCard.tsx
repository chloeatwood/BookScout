import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/Colors';

type BookCardProps = {
  title: string;
  author: string;
  progress?: number;
  onPress?: () => void;
};

export function BookCard({
  title,
  author,
  progress,
  onPress,
}: BookCardProps) {
  return (
    <Pressable
      style={{
        width: 150,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.lightGray,
      }}
      onPress={onPress}
    >
      <View
        style={{
          height: 150,
          borderRadius: 10,
          backgroundColor: colors.forest,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <Ionicons
          name="book-outline"
          size={38}
          color={colors.cream}
        />
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: '700',
          color: colors.dark,
          lineHeight: 20,
          minHeight: 40,
        }}
        numberOfLines={2}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 13,
          color: colors.gray,
          marginTop: 3,
        }}
        numberOfLines={1}
      >
        {author}
      </Text>

      {progress !== undefined && (
        <>
          <View
            style={{
              height: 5,
              backgroundColor: colors.lightGray,
              borderRadius: 5,
              overflow: 'hidden',
              marginTop: 12,
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: colors.sage,
                borderRadius: 5,
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 11,
              color: colors.gray,
              marginTop: 5,
            }}
          >
            {progress}% complete
          </Text>
        </>
      )}
    </Pressable>
  );
}
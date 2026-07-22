import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/Colors';

type BookListItemProps = {
  title: string;
  author: string;
  price?: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function BookListItem({
  title,
  author,
  price,
  subtitle,
  icon = 'book-outline',
  onPress,
}: BookListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        minHeight: 82,
        backgroundColor: colors.white,
        borderRadius: 14,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.lightGray,
      }}
    >
      <View
        style={{
          width: 58,
          height: 62,
          borderRadius: 9,
          backgroundColor: colors.forest,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name={icon}
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

        {subtitle && (
          <Text
            style={{
              fontSize: 11,
              color: colors.gray,
              marginTop: 5,
            }}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {price && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.forest,
            }}
          >
            {price}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.gray}
          />
        </View>
      )}
    </Pressable>
  );
}
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/constants/Colors';

type SectionHeaderProps = {
  title: string;
  action?: string;
  onPress?: () => void;
};

export function SectionHeader({
  title,
  action,
  onPress,
}: SectionHeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
        marginTop: 4,
      }}
    >
      <Text
        style={{
          fontSize: 21,
          fontWeight: '700',
          color: colors.forest,
        }}
      >
        {title}
      </Text>

      {action && (
        <Pressable onPress={onPress}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: colors.brown,
            }}
          >
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
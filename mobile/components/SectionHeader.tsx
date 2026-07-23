import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { BookList } from '@/types/book';

type SectionHeaderProps = {
  title: string;
  list: BookList;
};

export function SectionHeader({
  title,
  list,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Pressable
        onPress={() =>
          router.push({
            pathname: '/list/[type]',
            params: {
              type: list,
            },
          })
        }
        style={styles.seeAll}
      >
        <Text style={styles.seeAllText}>
          See All
        </Text>

        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.forest}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.forest,
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.forest,
  },
});
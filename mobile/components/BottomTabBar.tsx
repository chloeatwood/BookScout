import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/Colors';

const tabs = [
  { name: 'Tracker', path: '/', icon: 'book-outline' },
  { name: 'Finder', path: '/finder', icon: 'search-outline' },
  { name: 'Add', path: '/add', icon: 'add-circle-outline' },
  { name: 'Analysis', path: '/analysis', icon: 'stats-chart-outline' },
  { name: 'Settings', path: '/settings', icon: 'settings-outline' },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 8 }]}>
      {tabs.map((tab) => {
        const active = pathname === tab.path;
        const color = active ? colors.forest : colors.gray;

        return (
          <Pressable
            key={tab.path}
            style={styles.tab}
            onPress={() => router.push(tab.path)}
          >
            <Ionicons name={tab.icon} size={24} color={color} />
            <Text style={[styles.label, { color }]}>{tab.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.lightGray,
    backgroundColor: colors.white,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  label: {
    fontSize: 11,
  },
});
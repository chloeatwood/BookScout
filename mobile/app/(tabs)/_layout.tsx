import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/Colors';

export default function RootLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.forest,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.lightGray,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tracker',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="book-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="finder"
          options={{
            title: 'Finder',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="search-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="add-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="analysis"
          options={{
            title: 'Analysis',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="stats-chart-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />

        {/* To keep pages from being added to bottom nav bar
            add them below */}

        {/* <Tabs.Screen
          name="manual-entry"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="book/[id]"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="list/[type]"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="book-details"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="scanner"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="help-feedback"
          options={{
            href: null,
          }}
        /> */}
      </Tabs>
  );
}
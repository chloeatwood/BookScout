import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>

        <Text style={styles.subtitle}>
          Customize your BookScout experience.
        </Text>

        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        <SettingItem
          icon="person-outline"
          title="Profile"
          subtitle="Manage your account"
        />

        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="Price drops and reading reminders"
        />

        <SettingItem
          icon="storefront-outline"
          title="Preferred Stores"
          subtitle="Choose where BookScout searches"
        />

        <SettingItem
          icon="moon-outline"
          title="Appearance"
          subtitle="Light or dark mode"
        />

        <Text style={styles.sectionTitle}>
          About
        </Text>

        <SettingItem
          icon="information-circle-outline"
          title="About BookScout"
          subtitle="Learn more about the app"
        />

        <SettingItem
          icon="help-circle-outline"
          title="Help & Feedback"
          subtitle="Get help or send feedback"
        />

        <Text style={styles.version}>
          BookScout v0.1.0
        </Text>
      </ScrollView>
    </View>
  );
}

function SettingItem({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable style={styles.settingItem}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.forest}
        />
      </View>

      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>
          {title}
        </Text>

        <Text style={styles.settingSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.gray}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 32,
    marginBottom: 12,
  },

  settingItem: {
    minHeight: 72,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingText: {
    flex: 1,
    marginLeft: 12,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.dark,
  },

  settingSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },

  version: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 12,
    marginTop: 40,
  },
});
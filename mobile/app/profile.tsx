import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/Colors';
import { supabase } from '@/utils/supabase';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This permanently deletes your account and all of your bookshelf data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDeleteAccount,
        },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);

    const { error } = await supabase.functions.invoke(
      'delete-account'
    );

    if (error) {
      setDeleting(false);
      Alert.alert(
        'Something went wrong',
        'We could not delete your account. Please try again or contact support.'
      );
      return;
    }

    // The edge function deleted the account server-side.
    // Clear the local session so the app redirects to /login.
    await supabase.auth.signOut();
  };

  const initial =
    user?.email?.charAt(0).toUpperCase() ?? '?';

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(
        undefined,
        { year: 'numeric', month: 'long' }
      )
    : null;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
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

        <Text style={styles.title}>Profile</Text>

        {loading ? (
          <ActivityIndicator
            color={colors.forest}
            style={styles.loading}
          />
        ) : (
          <>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {initial}
                </Text>
              </View>

              <Text style={styles.email}>
                {user?.email ?? 'Unknown'}
              </Text>

              {memberSince && (
                <Text style={styles.memberSince}>
                  Member since {memberSince}
                </Text>
              )}
            </View>

            <View style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>
                  Email
                </Text>
                <Text style={styles.cardValue}>
                  {user?.email ?? '—'}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>
                  User ID
                </Text>
                <Text
                  style={styles.cardValue}
                  numberOfLines={1}
                >
                  {user?.id ?? '—'}
                </Text>
              </View>
            </View>

            <Pressable
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={colors.dark}
              />
              <Text style={styles.logoutText}>
                Log Out
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={confirmDeleteAccount}
              disabled={deleting}
            >
              {deleting ? (
                <ActivityIndicator color="#B3261E" />
              ) : (
                <>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#B3261E"
                  />
                  <Text style={styles.deleteText}>
                    Delete Account
                  </Text>
                </>
              )}
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
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

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: 24,
  },

  loading: {
    marginTop: 40,
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
  },

  email: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.dark,
  },

  memberSince: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 4,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 16,
    marginBottom: 24,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  cardLabel: {
    fontSize: 13,
    color: colors.gray,
  },

  cardValue: {
    fontSize: 14,
    color: colors.dark,
    fontWeight: '600',
    maxWidth: '65%',
    textAlign: 'right',
  },

  divider: {
    height: 1,
    backgroundColor: colors.lightGray,
  },

  logoutButton: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },

  deleteButton: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1C4C0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },

  deleteText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#B3261E',
  },
});
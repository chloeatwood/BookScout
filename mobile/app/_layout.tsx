import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Session } from '@supabase/supabase-js';

import { BookProvider } from '@/context/BookContext';
import { colors } from '@/constants/Colors';
import { supabase } from '@/utils/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (initializing) return;

    const onLoginScreen = segments[0] === 'login';

    if (!session && !onLoginScreen) {
      router.replace('/login');
    } else if (session && onLoginScreen) {
      router.replace('/(tabs)');
    }
  }, [session, initializing, segments]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.forest} />
      </View>
    );
  }

  return (
    <BookProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />

        <Stack.Screen name="scanner" />
        <Stack.Screen name="finder" />
        <Stack.Screen name="manual-entry" />
        <Stack.Screen name="book-details" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="help-feedback" />
        <Stack.Screen name="list/[type]" />
        <Stack.Screen name="book/[id]" />
      </Stack>
    </BookProvider>
  );
}


  const styles = {
  loadingContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.cream,
  },
}
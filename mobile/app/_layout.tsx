import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Session } from '@supabase/supabase-js';

import { BookProvider } from '@/context/BookContext';
import { colors } from '@/constants/Colors';
import { supabase } from '@/utils/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(
    null
  );
  const [initializing, setInitializing] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  // Load the current session once, then keep listening
  // for sign-in / sign-out / token refresh events.
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

  // Once we know the auth state, send the user to the
  // right place based on where they currently are.
  useEffect(() => {
    if (initializing) return;

    const onLoginScreen = segments[0] === 'login';

    if (!session && !onLoginScreen) {
      router.replace('/login');
    } else if (session && onLoginScreen) {
      router.replace('/');
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
      <Slot />
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
};
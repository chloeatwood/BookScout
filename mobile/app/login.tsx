import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '@/constants/Colors';
import { supabase } from '@/utils/supabase';

type Mode = 'signIn' | 'signUp';

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<
    string | null
  >(null);
  const [infoMessage, setInfoMessage] = useState<
    string | null
  >(null);

  const isSignUp = mode === 'signUp';

  const handleSubmit = async () => {
    setErrorMessage(null);
    setInfoMessage(null);

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage(
        'Enter both an email and a password.'
      );
      return;
    }

    if (isSignUp && !trimmedName) {
      setErrorMessage('Enter your name.');
      return;
    }

    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: trimmedName,
            phone: trimmedPhone,
          },
        },
      });

      setLoading(false);

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setInfoMessage(
        'Check your email to confirm your account, then sign in.'
      );
      setMode('signIn');
      return;
    }

    const { error } =
      await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.replace('/');
  };

  const toggleMode = () => {
    setErrorMessage(null);
    setInfoMessage(null);
    setName('');
    setPhone('');
    setMode(isSignUp ? 'signIn' : 'signUp');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>BookScout</Text>

        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Create an account to start tracking your books.'
            : 'Sign in to pick up where you left off.'}
        </Text>

        {isSignUp && (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Jane Doe"
                placeholderTextColor={colors.gray}
                autoCapitalize="words"
                autoComplete="name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                Phone Number
              </Text>

              <TextInput
                style={styles.input}
                placeholder="(555) 123-4567"
                placeholderTextColor={colors.gray}
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.gray}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.gray}
            secureTextEntry
            autoCapitalize="none"
            autoComplete={
              isSignUp
                ? 'new-password'
                : 'current-password'
            }
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {errorMessage && (
          <Text style={styles.errorText}>
            {errorMessage}
          </Text>
        )}

        {infoMessage && (
          <Text style={styles.infoText}>
            {infoMessage}
          </Text>
        )}

        <Pressable
          style={[
            styles.submitButton,
            loading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Text>
          )}
        </Pressable>

        <Pressable onPress={toggleMode}>
          <Text style={styles.toggleText}>
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.forest,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: 6,
  },

  input: {
    height: 54,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.dark,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  errorText: {
    color: '#B3261E',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },

  infoText: {
    color: colors.forest,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },

  submitButton: {
    height: 54,
    backgroundColor: colors.forest,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  toggleText: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 13,
    marginTop: 20,
  },
});
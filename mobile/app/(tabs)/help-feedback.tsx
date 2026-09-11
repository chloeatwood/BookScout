import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/Colors';

const SUPPORT_EMAIL = 'catwood0419@gmail.com'; //For now anyways

export default function HelpFeedbackScreen() {
  const insets = useSafeAreaInsets();

  const openMail = (subject: string) => {
    const url = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}`;
    Linking.openURL(url);
  };

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

        <Text style={styles.title}>
          Help & Feedback
        </Text>

        <Text style={styles.subtitle}>
          Run into a problem, or have an idea for
          BookScout? We would love to hear from you.
        </Text>

        <Text style={styles.sectionTitle}>
          Frequently Asked
        </Text>

        <FaqItem
          question="Where does my book data come from?"
          answer="Book details come from the Open Library API. Prices come from your preferred stores once you connect them."
        />

        <FaqItem
          question="Is my reading list private?"
          answer="Yes. Your bookshelf and lists are tied to your account and protected by row-level security in Supabase."
        />

        <FaqItem
          question="How do I delete my account?"
          answer="Don't worry! We made sure account deletion is simple! Go to Settings -> Profile -> Delete Account"
        />

        <Text style={styles.sectionTitle}>
          Get In Touch
        </Text>

        <Pressable
          style={styles.actionCard}
          onPress={() =>
            openMail('BookScout Support Request')
          }
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="help-buoy-outline"
              size={22}
              color={colors.forest}
            />
          </View>

          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>
              Report a Problem
            </Text>
            <Text style={styles.actionSubtitle}>
              Something not working right? Let us know.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.gray}
          />
        </Pressable>

        <Pressable
          style={styles.actionCard}
          onPress={() =>
            openMail('BookScout Feedback')
          }
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color={colors.forest}
            />
          </View>

          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>
              Send Feedback
            </Text>
            <Text style={styles.actionSubtitle}>
              Ideas, feature requests, anything at all.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.gray}
          />
        </Pressable>

        <Text style={styles.footer}>
          {SUPPORT_EMAIL}
        </Text>
      </ScrollView>
    </View>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <View style={styles.faqItem}>
      <Text style={styles.faqQuestion}>
        {question}
      </Text>
      <Text style={styles.faqAnswer}>{answer}</Text>
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
  },

  subtitle: {
    fontSize: 15,
    color: colors.gray,
    marginTop: 8,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 28,
    marginBottom: 12,
  },

  faqItem: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 4,
  },

  faqAnswer: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
  },

  actionCard: {
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

  actionText: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.dark,
  },

  actionSubtitle: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },

  footer: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 12,
    marginTop: 24,
  },
});
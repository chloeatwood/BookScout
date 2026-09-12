import { Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';
import { BottomTabBar } from '@/components/BottomTabBar';

export default function AboutBookScoutScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'About BookScout',
          headerTintColor: colors.forest,
          headerStyle: {
            backgroundColor: colors.cream,
          },
        }}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* App Header */}
        <View style={styles.hero}>
          <Text style={styles.bookIcon}>📚</Text>

          <Text style={styles.appName}>BookScout</Text>

          <Text style={styles.version}>Version 1.0</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About BookScout</Text>

          <Text style={styles.bodyText}>
            BookScout is a personal book discovery and tracking application
            designed to help you discover books, manage your personal library,
            and keep track of what you are reading.
          </Text>

          <Text style={styles.bodyText}>
            The application is also being developed as a personal software
            engineering project, with a focus on mobile development, APIs,
            databases, backend development, data engineering, and machine
            learning.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Can Do</Text>

          <FeatureItem
            icon="🔎"
            title="Discover Books"
            description="Search for books using the Open Library API."
          />

          <FeatureItem
            icon="📷"
            title="Scan ISBNs"
            description="Use your camera to scan a book's ISBN barcode."
          />

          <FeatureItem
            icon="📚"
            title="Manage Your Library"
            description="Add books to your personal collection and organize them into reading lists."
          />

          <FeatureItem
            icon="✏️"
            title="Track Your Reading"
            description="Update book information and move books between reading lists."
          />

          <FeatureItem
            icon="🔍"
            title="Search Your Collection"
            description="Quickly find books you've already added to your library."
          />

          <FeatureItem
            icon="☁️"
            title="Sync Your Data"
            description="Your collection is stored persistently using Supabase and PostgreSQL."
          />
        </View>

        {/* Technology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>

          <TechRow
            title="Mobile"
            value="React Native • Expo • TypeScript"
          />

          <TechRow
            title="Navigation"
            value="Expo Router • React Navigation"
          />

          <TechRow
            title="Backend"
            value="Supabase"
          />

          <TechRow
            title="Database"
            value="PostgreSQL"
          />

          <TechRow
            title="Authentication"
            value="Supabase Authentication"
          />

          <TechRow
            title="Book Data"
            value="Open Library API"
          />
        </View>

        {/* Roadmap */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Will Be Next?</Text>

          <Text style={styles.bodyText}>
            BookScout is still actively being developed. Future versions may
            include:
          </Text>

          <RoadmapItem text="Book price comparison" />
          <RoadmapItem text="Historical price tracking" />
          <RoadmapItem text="Book and edition matching" />
          <RoadmapItem text="Personalized book recommendations" />
          <RoadmapItem text="Data analysis and data pipelines" />
          <RoadmapItem text="Machine learning features" />
          <RoadmapItem text="Additional reading tracking features" />
          <RoadmapItem text="Cloud deployment and production infrastructure" />
        </View>

        {/* Project Information */}
        <View style={styles.projectSection}>
          <Text style={styles.projectTitle}>
            Built as a learning project
          </Text>

          <Text style={styles.projectText}>
            BookScout is being developed incrementally, with each stage
            introducing another area of software engineering.
          </Text>

          <Text style={styles.projectText}>
            The project started as a simple mobile application and has grown
            into a database-backed application with authentication, persistent
            user data, and external API integration.
          </Text>

          <Text style={styles.projectText}>
            The goal is to continue expanding BookScout into a complete,
            production-style application while exploring new technologies and
            software engineering concepts along the way.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Chloe Atwood
          </Text>

          <Text style={styles.footerSubtext}>
            All rights reserved.
          </Text>
        </View>
      </ScrollView>

      <BottomTabBar />
    </>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>

        <Text style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

function TechRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={styles.techRow}>
      <Text style={styles.techTitle}>{title}</Text>

      <Text style={styles.techValue}>{value}</Text>
    </View>
  );
}

function RoadmapItem({ text }: { text: string }) {
  return (
    <View style={styles.roadmapItem}>
      <Text style={styles.roadmapBullet}>•</Text>

      <Text style={styles.roadmapText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  hero: {
    alignItems: 'center',
    paddingTop: 8,
    marginBottom: 28,
  },

  bookIcon: {
    fontSize: 52,
    marginBottom: 6,
  },

  appName: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.forest,
  },

  version: {
    marginTop: 4,
    fontSize: 14,
    color: colors.gray,
  },

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: 12,
  },

  bodyText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.brown,
    marginBottom: 12,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  featureIcon: {
    fontSize: 22,
    width: 38,
    marginTop: 1,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.forest,
    marginBottom: 3,
  },

  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray,
  },

  techRow: {
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGray,
  },

  techTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.forest,
    marginBottom: 3,
  },

  techValue: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray,
  },

  roadmapItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  roadmapBullet: {
    width: 18,
    fontSize: 18,
    lineHeight: 20,
    color: colors.sage,
  },

  roadmapText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.brown,
  },

  projectSection: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: colors.lavender,
    marginBottom: 26,
  },

  projectTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.forest,
    marginBottom: 10,
  },

  projectText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.forest,
    marginBottom: 10,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
  },

  footerText: {
    fontSize: 13,
    color: colors.gray,
  },

  footerSubtext: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },
});
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants/Colors';

export default function AnalysisScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Analysis</Text>

        <Text style={styles.subtitle}>
          See how you read and where you find the best deals.
        </Text>

        <View style={styles.statsGrid}>
          <StatCard
            icon="book-outline"
            value="24"
            label="Books Read"
          />

          <StatCard
            icon="cash-outline"
            value="$183"
            label="Money Saved"
          />

          <StatCard
            icon="library-outline"
            value="37"
            label="Books Tracked"
          />

          <StatCard
            icon="trending-down-outline"
            value="18%"
            label="Avg. Savings"
          />
        </View>

        <Text style={styles.sectionTitle}>
          Reading Progress
        </Text>

        <View style={styles.chartPlaceholder}>
          <Ionicons
            name="bar-chart-outline"
            size={48}
            color={colors.sage}
          />

          <Text style={styles.placeholderTitle}>
            Your reading stats will appear here
          </Text>

          <Text style={styles.placeholderText}>
            Track your reading habits and discover
            patterns over time.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Price Insights
        </Text>

        <View style={styles.insightCard}>
          <Ionicons
            name="leaf-outline"
            size={30}
            color={colors.forest}
          />

          <View style={styles.insightText}>
            <Text style={styles.insightTitle}>
              Keep scouting!
            </Text>

            <Text style={styles.insightDescription}>
              BookScout will help you find the best
              prices across your favorite stores.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons
        name={icon}
        size={26}
        color={colors.forest}
      />

      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
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
    lineHeight: 22,
    marginTop: 8,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 28,
  },

  statCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 12,
  },

  statLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 32,
    marginBottom: 14,
  },

  chartPlaceholder: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },

  placeholderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest,
    marginTop: 12,
  },

  placeholderText: {
    fontSize: 13,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
  },

  insightCard: {
    backgroundColor: colors.sage,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  insightText: {
    flex: 1,
    marginLeft: 14,
  },

  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.forest,
  },

  insightDescription: {
    fontSize: 13,
    color: colors.forest,
    lineHeight: 19,
    marginTop: 4,
  },
});
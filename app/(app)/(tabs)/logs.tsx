import SummaryCard from '@/components/ai/SummaryCard';
import { AppText } from '@/components/ui/AppText';
import BottomSpacer from '@/components/ui/BottomSpacer';
import GlassPanel from '@/components/ui/GlassPanel';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type LogEntry = {
  id: string;
  type: 'meal' | 'water' | 'exercise' | 'sleep';
  title: string;
  time: string;
  details: string;
  icon: keyof typeof Ionicons.glyphMap;
};

// Sample log data
const sampleLogs: LogEntry[] = [
  {
    id: '1',
    type: 'meal',
    title: 'Breakfast',
    time: '8:30 AM',
    details: 'Oatmeal with berries, 350 cal',
    icon: 'restaurant-outline',
  },
  {
    id: '2',
    type: 'water',
    title: 'Water',
    time: '10:15 AM',
    details: '500ml',
    icon: 'water-outline',
  },
  {
    id: '3',
    type: 'exercise',
    title: 'Morning Run',
    time: '6:45 AM',
    details: '30 minutes, 4.2km',
    icon: 'fitness-outline',
  },
  {
    id: '4',
    type: 'meal',
    title: 'Lunch',
    time: '12:30 PM',
    details: 'Grilled chicken salad, 520 cal',
    icon: 'restaurant-outline',
  },
  {
    id: '5',
    type: 'sleep',
    title: 'Sleep',
    time: '10:30 PM - 6:30 AM',
    details: '8 hours, good quality',
    icon: 'moon-outline',
  }
];

export default function LogsScreen() {
  // Function to get color based on log type
  const getLogTypeColor = (type: LogEntry['type']) => {
    switch(type) {
      case 'meal': return 'rgba(76, 175, 80, 0.2)';
      case 'water': return 'rgba(33, 150, 243, 0.2)';
      case 'exercise': return 'rgba(255, 152, 0, 0.2)';
      case 'sleep': return 'rgba(156, 39, 176, 0.2)';
      default: return 'rgba(158, 158, 158, 0.2)';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <SummaryCard
          title="Today's Overview"
          body="Based on your recent activity, your overall health appears to be in excellent shape. Your balanced diet—rich in fruits, vegetables, lean proteins, and whole grains—provides the necessary fuel for your daily activities. Keep up the fantastic work and continue nurturing these healthy habits!"
          tags={['More Protein', 'Great Eating Habits']}
          rounded="lg"
          style={{ width: '100%', marginBottom: 16 }}
        />

      {/* Log Entries Section */}
      <View style={styles.section}>
        <AppText variant="h4" weight="medium" style={styles.sectionTitle}>
          Today's Logs
        </AppText>
        
        <View style={styles.logsContainer}>
          {sampleLogs.map((log) => (
            <GlassPanel key={log.id} rounded="lg" style={styles.logItem}>
              <View style={styles.logHeader}>
                <View style={styles.logTitleRow}>
                  <View style={[styles.iconContainer, { backgroundColor: getLogTypeColor(log.type) }]}>
                    <Ionicons name={log.icon} size={20} color="#333" />
                  </View>
                  <AppText variant="body1" weight="semibold">{log.title}</AppText>
                </View>
                <AppText variant="tagline" weight="light">{log.time}</AppText>
              </View>
              <AppText variant="body1" style={styles.logDetails}>
                {log.details}
              </AppText>
            </GlassPanel>
          ))}
        </View>
      </View>
      <BottomSpacer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  logsContainer: {
    gap: 12,
  },
  logItem: {
    padding: 12,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logDetails: {
    opacity: 0.8,
  },
});

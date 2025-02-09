import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Activity {
  id: string;
  type: 'completed' | 'upcoming';
  title: string;
  date: string;
  hours?: number;
}

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIconName = (): keyof typeof Ionicons.glyphMap => {
    switch (activity.type) {
      case 'completed':
        return 'checkmark-circle-outline';
      case 'upcoming':
        return 'calendar-outline';
      default:
        return 'ellipsis-horizontal-outline';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={getIconName()} size={24} color="#4CAF50" style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{activity.title}</Text>
        <Text style={styles.details}>
          {activity.type === 'completed' 
            ? `Completed on ${activity.date} - ${activity.hours} hours`
            : `Upcoming on ${activity.date}`
          }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default ActivityItem;

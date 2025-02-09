import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../types/User'; // Adjust the import path as needed

interface VolunteerStatsProps {
  userData: User;
}

const VolunteerStats: React.FC<VolunteerStatsProps> = ({ userData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Volunteer Stats</Text>
      <Text style={styles.statsText}>Total Hours: {userData.totalHours}</Text>
      <Text style={styles.statsText}>Completed Opportunities: {userData.completedOpportunities}</Text>
      <Text style={styles.statsText}>Planned Opportunities: {userData.plannedOpportunities}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default VolunteerStats;

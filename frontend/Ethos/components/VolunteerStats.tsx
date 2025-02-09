import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface UserData {
  totalHours: number;
  rank: string;
  categories: {
    name: string;
    hours: number;
    color: string;
  }[];
}

interface VolunteerStatsProps {
  userData: UserData;
}

const VolunteerStats: React.FC<VolunteerStatsProps> = ({ userData }) => {
  const chartData = userData.categories.map(category => ({
    name: category.name,
    population: category.hours,
    color: category.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Volunteer Stats</Text>
      <Text style={styles.statsText}>Total Hours: {userData.totalHours}</Text>
      <Text style={styles.statsText}>Rank: {userData.rank}</Text>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
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

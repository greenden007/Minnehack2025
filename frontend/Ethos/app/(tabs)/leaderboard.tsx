import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTopUsers, fetchUserProfile } from '../../services/userService'; // Assuming this function exists in userService
import { User, UserList } from '../../types/User'; // Assuming this type exists in types/User

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  score: number;
  isCurrentUser: boolean;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'allTime'>('week');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const userProfile = await fetchUserProfile(userToken);
          setUser(userProfile);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    loadUserProfile();
    fetchLeaderboardData();
  }, [timeFrame]);

  function convertToLeaderboard(userList: User[], currentUserId: string): LeaderboardEntry[] {
    return userList.map((user, index) => ({
      id: user.id,
      rank: index + 1,
      name: `${user.firstName} ${user.lastName}`,
      score: user.totalHours,
      isCurrentUser: user.id === currentUserId
    }));
  };

  const fetchLeaderboardData = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const response = await getTopUsers();
        console.log(response);
        const topTen: LeaderboardEntry[] = convertToLeaderboard(response, user.id); 
        console.log(topTen);
        setLeaderboardData(topTen);
      }
      else {
        console.log(user);
        // Mock data for demonstration
        const mockData: LeaderboardEntry[] = [
          { id: '1', rank: 1, name: 'John Doe', score: 1000, isCurrentUser: false },
          { id: '2', rank: 2, name: 'Jane Smith', score: 950, isCurrentUser: true },
          // Add more mock entries as needed
        ];
        setLeaderboardData(mockData);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLeaderboardItem = ({ item }: { item: LeaderboardEntry }) => (
    <View style={[styles.leaderboardItem, item.isCurrentUser && styles.currentUserItem]}>
      <Text style={styles.rank}>{item.rank}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  const renderTimeFrameButton = (frame: 'week' | 'month' | 'allTime', label: string) => (
    <TouchableOpacity
      style={[styles.timeFrameButton, timeFrame === frame && styles.activeTimeFrame]}
      onPress={() => setTimeFrame(frame)}
    >
      <Text style={[styles.timeFrameText, timeFrame === frame && styles.activeTimeFrameText]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.timeFrameContainer}>
          {renderTimeFrameButton('week', 'Week')}
          {renderTimeFrameButton('month', 'Month')}
          {renderTimeFrameButton('allTime', 'All Time')}
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.emptyText}>No leaderboard data available</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeFrameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeFrameButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeTimeFrame: {
    backgroundColor: '#4CAF50',
  },
  timeFrameText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  activeTimeFrameText: {
    color: '#FFFFFF',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  currentUserItem: {
    backgroundColor: '#E8F5E9',
  },
  rank: {
    width: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
  },
});

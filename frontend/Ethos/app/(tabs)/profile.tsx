import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserProfile } from '../../services/userService';
import { User } from '../../types/User';

export default function Profile() {
  const router = useRouter();
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
  }, []);

  if (!user) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>User Profile</Text>
          <Text style={styles.subtitle}>{user.firstName} {user.lastName}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoText}>{user.age}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoText}>{user.address}</Text>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Volunteering Stats</Text>
          <Text style={styles.statsText}>Total Hours: {user.totalHours}</Text>
          <Text style={styles.statsText}>Completed Opportunities: {user.completedOpportunities}</Text>
          <Text style={styles.statsText}>Planned Opportunities: {user.plannedOpportunities}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('./update')}

        >
          <Ionicons name="create" size={24} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userToken');
            router.replace('/');
          }}
        >
          <Ionicons name="log-out" size={24} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: '#666',
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  statsSection: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 15,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    marginTop: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth'; // Assuming you have an auth hook
import { fetchUserProfile } from '../../services/userService'; // Assuming this function exists in userService
import { User } from '../../types/User';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const { authUser, logout } = useAuth();

  useEffect(() => {
    if (authUser?.id) {
      loadUserProfile(authUser.id);
    }
  }, [authUser]);

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await fetchUserProfile(userId);
      setUser(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  if (!user) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Age</Text>
        <Text>{user.age}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Address</Text>
        <Text>{user.address}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Volunteering Stats</Text>
        <Text>Total Hours: {user.totalHours}</Text>
        <Text>Completed Opportunities: {user.completedOpportunities}</Text>
        <Text>Planned Opportunities: {user.plannedOpportunities}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

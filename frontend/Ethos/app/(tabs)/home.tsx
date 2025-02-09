import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { fetchUserProfile } from '../../services/userService'; // Adjust the import path as needed
import { User } from '../../types/User'; // Adjust the import path as needed

export default function Home() {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Ethos</Text>
          {user && (
            <Text style={styles.subtitle}>Welcome back, {user.firstName}!</Text>
          )}
        </View>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.infoText}>Total Hours: {user.totalHours}</Text>
            <Text style={styles.infoText}>Completed Opportunities: {user.completedOpportunities}</Text>
            <Text style={styles.infoText}>Planned Opportunities: {user.plannedOpportunities}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('./opportunities')}
        >
          <Ionicons name="search" size={24} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Find Opportunities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('./profile')}
        >
          <Ionicons name="person" size={24} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userToken');
            setUser(null);
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
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
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
  userInfo: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
});

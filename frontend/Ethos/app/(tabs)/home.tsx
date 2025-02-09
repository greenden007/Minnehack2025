import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { User } from '../../types/User';
import { Opportunity } from '../../types/Opportunity';

import VolunteerStats from '../../components/VolunteerStats';
import OpportunityCard from '../../components/OpportunityCard';
import ActivityItem from '../../components/ActivityItem';

interface Activity {
  id: string;
  type: 'completed' | 'upcoming';
  title: string;
  date: string;
  hours?: number;
}

export default function HomeScreen() {
  const router = useRouter();

  // Placeholder for data fetching
  const user: User = {
    id: '1',
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string; // ISO 8601 format
    address: string;
    bio: string;
    volunteeringStats: {
      totalHours: number;
      completedOpportunities: number;
      upcomingOpportunities: number;
    };
  };
  
  const featuredOpportunities: Opportunity[] = [];
  const recentActivities: Activity[] = [];

  // Fetch data here (useEffect, API calls, etc.)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <VolunteerStats userData={user} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Opportunities</Text>
          {featuredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/opportunities')}
          >
            <Text style={styles.viewAllText}>View All Opportunities</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </View>

        <TouchableOpacity 
          style={styles.impactButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.impactButtonText}>View Your Impact</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    paddingTop: 20, // Add padding to the top
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  notificationIcon: {
    padding: 5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  viewAllButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 5,
    marginTop: 10,
  },
  viewAllText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  impactButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  impactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

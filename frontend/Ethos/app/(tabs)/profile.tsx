import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Icon, Avatar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../../types/User';
import { fetchUserProfile } from '../../services/userService'; // Assuming you have this function

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await fetchUserProfile(); // Implement this function in userServices
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Handle error (show error message, etc.)
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Avatar
            size="large"
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            containerStyle={styles.avatar}
          />
          <Text h2>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <Card containerStyle={styles.card}>
          <Card.Title>Personal Information</Card.Title>
          <Card.Divider />
          <Text style={styles.infoText}>Age: {user.age}</Text>
          <Text style={styles.infoText}>Address: {user.address}</Text>
        </Card>

        <Card containerStyle={styles.card}>
          <Card.Title>Volunteering Stats</Card.Title>
          <Card.Divider />
          <Text style={styles.infoText}>Total Hours: {user.totalHours}</Text>
          <Text style={styles.infoText}>Completed Opportunities: {user.completedOpportunities}</Text>
          <Text style={styles.infoText}>Planned Opportunities: {user.plannedOpportunities}</Text>
        </Card>

        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <Button
          title="Log Out"
          icon={<Icon name="logout" color="#FFFFFF" />}
          buttonStyle={styles.logoutButton}
          onPress={() => {/* Implement logout logic */}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  avatar: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
});

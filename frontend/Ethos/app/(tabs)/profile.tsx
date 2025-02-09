import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../types/User';
import { Opportunity } from '../../types/Opportunity';

// Assume we have these services
import { getUserProfile, updateUserProfile, logout } from '../../services/userService';
import { getVolunteeringHistory } from '../../services/volunteeringService';



export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [volunteeringHistory, setVolunteeringHistory] = useState<Opportunity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    fetchUserProfile();
    fetchVolunteeringHistory();
  }, []);

  const fetchUserProfile = async () => {
    const userProfile = await getUserProfile();
    setUser(userProfile);
    setNewName(userProfile.name);
    setNewEmail(userProfile.email);
  };

  const fetchVolunteeringHistory = async () => {
    const history = await getVolunteeringHistory();
    setVolunteeringHistory(history);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleUpdateProfile = async () => {
    if (user) {
      const updatedUser = await updateUserProfile({
        ...user,
        name: newName,
        email: newEmail,
        // Include password only if it's been changed
        ...(newPassword ? { password: newPassword } : {}),
      });
      setUser(updatedUser);
      setIsEditing(false);
      setNewPassword('');
    }
  };

  const renderPersonalStats = () => {
    const completedOpportunities = volunteeringHistory.filter(opp => opp.status === 'Completed').length;
    const upcomingOpportunities = volunteeringHistory.filter(opp => opp.status === 'Upcoming').length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedOpportunities}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{upcomingOpportunities}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{volunteeringHistory.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    );
  };

  const renderVolunteeringHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Volunteering History</Text>
      {volunteeringHistory.map((opportunity) => (
        <View key={opportunity.id} style={styles.opportunityItem}>
          <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
          <Text style={styles.opportunityDate}>{opportunity.date}</Text>
          <Text style={[styles.opportunityStatus, { color: opportunity.status === 'Completed' ? 'green' : 'orange' }]}>
            {opportunity.status}
          </Text>
        </View>
      ))}
    </View>
  );

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter new name"
          />
        ) : (
          <Text style={styles.name}>{user.name}</Text>
        )}
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Text>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>

      {renderPersonalStats()}

      {isEditing ? (
        <View style={styles.editSection}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Enter new email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>New Password:</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderVolunteeringHistory()
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingItem}>
          <Text>Push Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        {/* Add more settings as needed */}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  opportunityItem: {
    marginBottom: 10,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  opportunityDate: {
    fontSize: 14,
    color: '#666',
  },
  opportunityStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  editSection: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

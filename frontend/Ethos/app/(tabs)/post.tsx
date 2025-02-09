import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Opportunity } from '../../types/Opportunity';
import { createOpportunity } from '../../services/opportunityService'; // Assume this function exists in your API service

export default function Post() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [minimumAge, setMinimumAge] = useState('');
  

  const handleSubmit = async () => {
    if (!title || !description || !location || !duration || !category || !minimumAge) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newOpportunity: Partial<Opportunity> = {
      title,
      description,
      location,
      startDate: startDate.toISOString().split('T')[0],
      startTime: startTime.toISOString().split('T')[1].substring(0, 5),
      duration,
      category,
      minimumAge: parseInt(minimumAge),
      status: 'upcoming',
      requiredSkills: 'none',
    };

    try {
      await createOpportunity(newOpportunity);
      Alert.alert('Success', 'Opportunity posted successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setLocation('');
      setStartDate(new Date());
      setStartTime(new Date());
      setDuration('');
      setCategory('');
      setMinimumAge('');
    } catch (error) {
      console.error('Error posting opportunity:', error);
      Alert.alert('Error', 'Failed to post opportunity. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Post a New Opportunity</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#C0C0C0"
          value={title}
          onChangeText={setTitle}
        />
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description"
          placeholderTextColor="#C0C0C0"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        
        <TextInput
          style={styles.input}
          placeholder="Location: address, city, state, country, zip"
          placeholderTextColor="#C0C0C0"
          value={location}
          onChangeText={setLocation}
        />
        
        <Text style={styles.label}>Start Date:</Text>
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
        />
        
        <Text style={styles.label}>Start Time:</Text>
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => setStartTime(selectedTime || startTime)}
          style={{ marginBottom: 20 }}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Duration (e.g., 2 hours)"
          placeholderTextColor="#C0C0C0"
          value={duration}
          onChangeText={setDuration}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#C0C0C0"
          value={category}
          onChangeText={setCategory}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Minimum Age"
          placeholderTextColor="#C0C0C0"
          value={minimumAge}
          onChangeText={setMinimumAge}
          keyboardType="numeric"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Opportunity</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

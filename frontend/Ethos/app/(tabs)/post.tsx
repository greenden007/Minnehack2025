// app/(tabs)/post.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Opportunity } from '../../types/Opportunity';

// Placeholder for API service
const submitOpportunity = async (opportunity: Partial<Opportunity>): Promise<boolean> => {
  // Implement API call here
  console.log('Submitting opportunity:', opportunity);
  return true; // Return true if submission is successful
};

export default function PostScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeCommitment, setTimeCommitment] = useState('');
  const [frequency, setFrequency] = useState('One-time');
  const [category, setCategory] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [ageRequirement, setAgeRequirement] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !organizationName || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newOpportunity: Partial<Opportunity> = {
      title,
      description,
      organizationInfo: {
        name: organizationName,
        id: organizationName + '7', // Placeholder for organization ID
        description: '',
        // Add other organization info as needed
      },
      location: {
        address: address,
        city: city,
        state: state,
        country: country,
        postalCode: postal_code,
        // Add other location details as needed
      },
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timeCommitment: {
        hours: parseInt(timeCommitment, 10),
        frequency: frequency as 'One-time' | 'Daily' | 'Weekly' | 'Monthly',
      },
      category: [category],
      requiredSkills: requiredSkills.split(',').map(skill => ({ skill: skill.trim(), level: 'Beginner' })),
      ageRequirement: {
        minimum: parseInt(ageRequirement, 10),
      },
      // Add other fields as needed
    };

    try {
      const result = await submitOpportunity(newOpportunity);
      if (result) {
        Alert.alert('Success', 'Opportunity posted successfully');
        // Reset form or navigate to another screen
      } else {
        Alert.alert('Error', 'Failed to post opportunity');
      }
    } catch (error) {
      console.error('Error posting opportunity:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Post a New Volunteering Opportunity</Text>
      
      <Text style={styles.label}>Title*</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter opportunity title"
      />

      <Text style={styles.label}>Description*</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the volunteering opportunity"
        multiline
      />

      <Text style={styles.label}>Organization Name*</Text>
      <TextInput
        style={styles.input}
        value={organizationName}
        onChangeText={setOrganizationName}
        placeholder="Enter organization name"
      />

      <Text style={styles.label}>Address*</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
      />

      <Text style={styles.label}>City*</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
      />

      <Text style={styles.label}>State*</Text>
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={setState}
        placeholder="Enter state"
      />

      <Text style={styles.label}>Country*</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Enter country"
      />

      <Text style={styles.label}>Postal Code*</Text>
      <TextInput
        style={styles.input}
        value={postal_code}
        onChangeText={setPostalCode}
        placeholder="Enter postal code"
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <Text style={styles.dateInput}>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <Text style={styles.dateInput}>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Time Commitment (hours)</Text>
      <TextInput
        style={styles.input}
        value={timeCommitment}
        onChangeText={setTimeCommitment}
        placeholder="Enter time commitment in hours"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Frequency</Text>
      <Picker
        selectedValue={frequency}
        onValueChange={(itemValue) => setFrequency(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="One-time" value="One-time" />
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Weekly" value="Weekly" />
        <Picker.Item label="Monthly" value="Monthly" />
      </Picker>

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      <Text style={styles.label}>Required Skills (comma-separated)</Text>
      <TextInput
        style={styles.input}
        value={requiredSkills}
        onChangeText={setRequiredSkills}
        placeholder="Enter required skills"
      />

      <Text style={styles.label}>Minimum Age Requirement</Text>
      <TextInput
        style={styles.input}
        value={ageRequirement}
        onChangeText={setAgeRequirement}
        placeholder="Enter minimum age"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Opportunity</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

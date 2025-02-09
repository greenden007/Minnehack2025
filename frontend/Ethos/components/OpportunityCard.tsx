import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Opportunity } from '../types/Opportunity'; // Adjust the import path as needed

interface OpportunityCardProps {
  opportunity: Opportunity;
  onPress?: (opportunity: Opportunity) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(opportunity)}>
      <View style={styles.header}>
        <Text style={styles.title}>{opportunity.title}</Text>
        <Ionicons name="bookmark-outline" size={24} color="#4CAF50" />
      </View>
      <Text style={styles.description}>{opportunity.description}</Text>
      <Text style={styles.location}>{opportunity.location}</Text>
      <Text style={styles.date}>
        {new Date(opportunity.startDate).toLocaleDateString()} at {opportunity.startTime}
      </Text>
      <Text style={styles.duration}>Duration: {opportunity.duration}</Text>
      <View style={styles.tags}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{opportunity.category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Age {opportunity.minimumAge}+</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: opportunity.status === 'Open' ? '#E8F5E9' : '#E3F2FD' }]}>
          <Text style={[styles.tagText, { color: opportunity.status === 'Open' ? '#4CAF50' : '#2196F3' }]}>
            {opportunity.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#4CAF50',
    fontSize: 12,
  },
});

export default OpportunityCard;

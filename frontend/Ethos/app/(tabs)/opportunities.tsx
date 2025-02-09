import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Opportunity, OpportunityList } from '../../types/Opportunity';
import { fetchOpportunities } from '../../services/opportunityService'; // Assume this function exists in your API service

const OpportunityItem: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
  return (
    <View style={styles.opportunityItem}>
      <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
      <Text style={styles.opportunityDetails}>{opportunity.description}</Text>
      <Text style={styles.opportunityDetails}>Location: {opportunity.location}</Text>
      <Text style={styles.opportunityDetails}>
        Date: {new Date(opportunity.startDate).toLocaleDateString()} at {opportunity.startTime}
      </Text>
      <Text style={styles.opportunityDetails}>Duration: {opportunity.duration}</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{opportunity.category}</Text>
        <Text style={[styles.status, { color: opportunity.status === 'upcoming' ? '#4CAF50' : '#F44336' }]}>
          {opportunity.status}
        </Text>
      </View>
    </View>
  );
};

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result: OpportunityList = await fetchOpportunities();
      setOpportunities(result.opportunityList);
    } catch (err) {
      setError('Failed to load opportunities. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadOpportunities}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Volunteering Opportunities</Text>
        <TouchableOpacity onPress={() => {/* Implement filter/search functionality */}}>
          <Ionicons name="filter" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={opportunities}
        renderItem={({ item }) => <OpportunityItem opportunity={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={isLoading}
        onRefresh={loadOpportunities}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  list: {
    padding: 16,
  },
  opportunityItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  opportunityDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  category: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#F44336',
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

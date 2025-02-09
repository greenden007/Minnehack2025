import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';

const FeaturedOpportunities = () => {
  // This would typically fetch data from an API
  const opportunities = [
    { id: 1, title: 'Community Garden', organization: 'Green Thumb Society' },
    { id: 2, title: 'Food Bank Helper', organization: 'Local Food Bank' },
  ];

  return (
    <View>
      <Text h3 style={styles.header}>Featured Opportunities</Text>
      {opportunities.map((opp) => (
        <Card key={opp.id}>
          <Card.Title>{opp.title}</Card.Title>
          <Text>{opp.organization}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
  },
});

export default FeaturedOpportunities;

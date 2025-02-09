import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ListItem } from '@rneui/themed';

const RecentActivity = () => {
  // This would typically fetch data from an API
  const activities = [
    { id: 1, user: 'John', action: 'volunteered at the animal shelter' },
    { id: 2, user: 'Sarah', action: 'donated to the food bank' },
  ];

  return (
    <View>
      <Text h3 style={styles.header}>Recent Activity</Text>
      {activities.map((activity) => (
        <ListItem key={activity.id}>
          <ListItem.Content>
            <ListItem.Title>{activity.user}</ListItem.Title>
            <ListItem.Subtitle>{activity.action}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
  },
});

export default RecentActivity;

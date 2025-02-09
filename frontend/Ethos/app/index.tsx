import React from 'react';
import { View, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text, Button, Card, Icon } from '@rneui/themed';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeaturedOpportunities from '../components/FeaturedOpportunities';
import RecentActivity from '../components/RecentActivity';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/background.jpeg')}
          style={styles.header}
        >
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text h1 style={styles.welcome}>ETHOS</Text>
          <Text style={styles.tagline}>Empowering Communities Through Volunteering</Text>
        </ImageBackground>

        {user ? (
          <View style={styles.userGreeting}>
            <Icon name="person" color="#4CAF50" size={24} />
            <Text style={styles.greetingText}>Welcome back, {user.name}!</Text>
          </View>
        ) : (
          <Link href="/login" asChild>
            <Button
              title="Log In"
              icon={<Icon name="login" color="#ffffff" />}
              buttonStyle={styles.loginButton}
            />
          </Link>
        )}

        <Card containerStyle={styles.card}>
          <Card.Title>Make a Difference Today</Card.Title>
          <Card.Divider />
          <Text style={styles.cardText}>
            Find volunteering opportunities in your community and start making an impact.
          </Text>
          <Button
            title="Explore Opportunities"
            icon={<Icon name="search" color="#ffffff" />}
            onPress={() => router.push('/(tabs)/opportunities')}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.exploreButton}
          />
        </Card>

        <FeaturedOpportunities />
        <RecentActivity />
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  welcome: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  tagline: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  greetingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 15,
  },
  exploreButton: {
    backgroundColor: '#FFC107',
    borderRadius: 25,
  },
});




import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '../types/User';
import { login } from '../services/userService';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    // TODO: Implement login logic
    if (!validateForm()) return;

    console.log('Login attempted with:', email, password);
    try {
      // TODO: Connect to backend API for user registration
      
      // Placeholder for successful signup
      // Replace this with actual API call when ready
      const response: AuthResponse = await login(email, password);

      if (response.token === "Invalid credentials") {
        console.log('login unsuccessful:', { email });
      }
      else {
        // Save user ID and token to AsyncStorage
        await AsyncStorage.setItem('userId', response.user.id);
        await AsyncStorage.setItem('userToken', response.token);
        console.log('Login successful:', { email });
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to log into account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Ethos</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#C0C0C0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#C0C0C0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 20,
    color: '#4CAF50',
  },
});


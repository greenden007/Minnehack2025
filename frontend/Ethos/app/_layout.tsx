import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const lightTheme = createTheme({
  lightColors: {
    primary: '#4CAF50',
    secondary: '#FFC107',
    background: '#F5F5F5',
  },
  components: {
    Text: {
      style: {
        fontFamily: 'Raleway_400Regular',
      },
    },
  },
});

const darkTheme = createTheme({
  darkColors: {
    primary: '#81C784',
    secondary: '#FFD54F',
    background: '#212121',
  },
  components: {
    Text: {
      style: {
        fontFamily: 'Raleway_400Regular',
      },
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  React.useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="opportunities" options={{ title: 'Opportunities' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
          <Stack.Screen name="post" options={{ title: 'Create Post' }} />
          <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

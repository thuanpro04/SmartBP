import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppRouter from './src/screens/routers/AppRouter';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Host } from 'react-native-portalize';
import LoginScreen from './src/screens/auth/LoginScreen';
import SetUpInfomationScreen from './src/screens/auth/SetUpInfomationScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Host>
          <SafeAreaProvider>
            <AppRouter />
          </SafeAreaProvider>
        </Host>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});

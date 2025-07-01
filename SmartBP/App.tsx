import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AppRouter from './src/screens/routers/AppRouter';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/SplashScreen';
const App = () => {
  return (
    <SplashScreen /> 
  );
};

export default App;

const styles = StyleSheet.create({});

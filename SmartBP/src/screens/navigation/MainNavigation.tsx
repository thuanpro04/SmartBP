import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackerScreen from '../tracker/TrackerScreen';
import BottomTabNavigation from './BottomTabNavigation';
import HistoryScreen from '../historys/HistoryScreen';
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={BottomTabNavigation} />
      <Stack.Screen name="history" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});

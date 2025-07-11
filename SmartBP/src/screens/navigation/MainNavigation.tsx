import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackerScreen from '../tracker/TrackerScreen';
import BottomTabNavigation from './BottomTabNavigation';
import HistoryScreen from '../historys/HistoryScreen';
import PressureRecordScreen from '../pressureRecord/PressureRecordScreen';
import MeasureGuideScreen from '../measureGuide/MeasureGuideScreen';
import LanguageScreen from '../language/LanguageScreen';
import FeedBackScreen from '../feedback/FeedBackScreen';
import ExportScreen from '../export/ExportScreen';
import RateUsScreen from '../rateUs/RateUsScreen';
import AuthNavigation from './AuthNavigation';
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main" component={BottomTabNavigation} />
      <Stack.Screen name="history" component={HistoryScreen} />
      <Stack.Screen name="record" component={PressureRecordScreen} />
      <Stack.Screen name="measure" component={MeasureGuideScreen} />
      <Stack.Screen name="language" component={LanguageScreen} />
      <Stack.Screen name="feedback" component={FeedBackScreen} />
      <Stack.Screen name="export" component={ExportScreen} />
      <Stack.Screen name="star" component={RateUsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});

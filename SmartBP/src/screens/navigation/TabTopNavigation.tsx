import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BloodPeressureScreen from '../bloodPeressure/BloodPeressureScreen';
import HeartRateScreen from '../heartRate/HeartRateScreen';
import { appColors } from '../../utils/appColors';
interface Props {
  nameScreen1: string;
  component1: React.ComponentType<any>;
  nameScreen2: string;
  component2: React.ComponentType<any>;
  tabBarLabel1: string;
  tabBarLabel2: string;
}
const Tab = createMaterialTopTabNavigator();

export default function TabTopNavigation(props: Props) {
  const {
    component1,
    component2,
    nameScreen1,
    nameScreen2,
    tabBarLabel1,
    tabBarLabel2,
  } = props;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.textSecondary,
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: appColors.primary, height: 3 },
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen
        name={nameScreen1}
        component={component1}
        options={{ tabBarLabel: tabBarLabel1 }}
      />
      <Tab.Screen
        name={nameScreen2}
        component={component2}
        options={{ tabBarLabel: tabBarLabel2 }}
      />
    </Tab.Navigator>
  );
}

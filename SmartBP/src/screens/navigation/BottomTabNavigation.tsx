import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackerScreen from '../tracker/TrackerScreen';
import InfoScreen from '../Info/InfoScreen';
import SettingScreen from '../settting/SettingScreen';
import { appColors } from '../../utils/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextComponent } from '../components/layout';
import { appSizes } from '../../utils/appSizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tracker"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          size = 24;
          color = focused ? appColors.primary : appColors.textSecondary;
          switch (route.name) {
            case 'Tracker':
              icon = <MaterialIcons name="insert-chart" size={size} color={color} />;
              break;
            case 'Info':
              icon = <FontAwesome6 name="book-medical" size={size} color={color} />;
              break;
            case 'Settings':
              icon = <AntDesign name="setting" size={size} color={color} />;
              break;
          }
          return icon;
        },
        tabBarLabel({ focused }) {
          return (
            <TextComponent
              label={route.name}
              style={{
                color: focused ? appColors.primary : appColors.textSecondary,
                fontSize: appSizes.medium,
                marginBottom:22,
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Tracker" component={TrackerScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({});

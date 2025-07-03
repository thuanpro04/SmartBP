import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
  SafeAreaView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import BloodPeressureScreen from '../bloodPeressure/BloodPeressureScreen';
import HeartRateScreen from '../heartRate/HeartRateScreen';
import { Add } from 'iconsax-react-native';
import TabTopNavigation from '../navigation/TabTopNavigation';

const TrackerScreen = ({ navigation }: any) => {
  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          title="Tracker"
          text="History"
          onPress={() => navigation.navigate('history')}
        />
      </View>
      <TabTopNavigation
        nameScreen1="BloodPressure"
        tabBarLabel1="Blood Pressure"
        component1={BloodPeressureScreen}
        nameScreen2="HeartRate"
        component2={HeartRateScreen}
        tabBarLabel2="Heart Rate"
      />

      <ButtonComponent
        onPress={() => console.log('Chuyển trang đo huyets app')}
        style={styles.btnAdd}
      >
        <Add color={'#ffffff'} />
      </ButtonComponent>
    </ContainerComponent>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    backgroundColor: appColors.cardBg,
  },
  tabContainer: {
    marginTop: 28,
  },
  tabScreen: {
    paddingBottom: 16,
  },
  nameScreen: {
    paddingHorizontal: 16,
    fontSize: appSizes.xLarge,
    fontWeight: '700',
  },
  bottomBarContainer: {
    position: 'relative',
    height: 6,
    borderBottomColor: appColors.border,
    borderBottomWidth: 2,
  },
  bottomBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: appColors.border,
    borderRadius: 3,
  },
  animatedBottomBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: 6,
    borderRadius: 3,
    zIndex: 1,
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 999,
  },
  btnAdd: {
    backgroundColor: appColors.primary,
    position: 'absolute',
    bottom: '3%',
    width: 55,
    height: 55,
    borderRadius: 50,
    right: '3%',
  },
});

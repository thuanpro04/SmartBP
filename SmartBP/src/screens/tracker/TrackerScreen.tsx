import { useFocusEffect } from '@react-navigation/native';
import { Add } from 'iconsax-react-native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import BloodPeressureScreen from '../bloodPeressure/BloodPeressureScreen';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
} from '../components/layout';
import AddModal from '../components/modal/AddModal';
import HeartRateScreen from '../heartRate/HeartRateScreen';
import TabTopNavigation from '../navigation/TabTopNavigation';
import SetupInfoModal from '../components/modal/SetupInfoModal';

const TrackerScreen = ({ navigation }: any) => {
  const [isAddModal, setIsAddModal] = useState(false);
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        const allGranted = Object.values(granted).every(
          permission => permission === PermissionsAndroid.RESULTS.GRANTED,
        );
        if (!allGranted) {
          Alert.alert(
            'Cần cấp quyền',
            'Ứng dụng cần quyền truy cập Bluetooth và vị trí để hoạt động',
          );
        }
      } catch (error) {
        console.log('Lỗi khi xin quyền:', error);
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      requestPermissions();
    }, []),
  );
  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          title="Theo dỗi"
          text="Lịch sử"
          onPress={() => navigation.navigate('history')}
        />
      </View>
      <TabTopNavigation
        nameScreen1="BloodPressure"
        tabBarLabel1="Huyết Áp"
        component1={BloodPeressureScreen}
        nameScreen2="HeartRate"
        component2={HeartRateScreen}
        tabBarLabel2="Nhịp tim"
      />

      <ButtonComponent
        onPress={() => setIsAddModal(!isAddModal)}
        style={styles.btnAdd}
      >
        <Add color={'#ffffff'} size={appSizes.iconM} />
      </ButtonComponent>
      <AddModal
        isVisible={isAddModal}
        onClose={() => setIsAddModal(false)}
        navigation={navigation}
      />
      <SetupInfoModal visible={true} onClose={() => {}} onComplete={() => {}} />
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
    right: '8%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

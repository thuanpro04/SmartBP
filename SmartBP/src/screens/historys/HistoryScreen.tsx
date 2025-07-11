import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
} from '../components/layout';
import TabTopNavigation from '../navigation/TabTopNavigation';
import { appColors } from '../../utils/appColors';
import { ArrowLeft, ArrowLeft2 } from 'iconsax-react-native';
import { appSizes } from '../../utils/appSizes';
import BloodHistoryScreen from './BloodHistoryScreen';
import HeartHistoryScreen from './HeartHistoryScreen';
import Entypo from 'react-native-vector-icons/Entypo';
const HistoryScreen = ({ navigation }: any) => {
  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent
          style={{ gap: 0, paddingHorizontal: 0, paddingBottom: 0 }}
          icon={
            <ButtonComponent
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: 'transparent' }}
            >
              <Entypo
                name="chevron-left"
                size={appSizes.iconL}
                color={appColors.primary}
              />
            </ButtonComponent>
          }
          title="Lịch sử"
          onPress={() => navigation.navigate('history')}
        />
      </View>
      <TabTopNavigation
        nameScreen1="BloodHistory"
        tabBarLabel1="Huyết áp"
        component1={BloodHistoryScreen}
        nameScreen2="HeartHistory"
        component2={HeartHistoryScreen}
        tabBarLabel2="Nhịp tim"
      />
    </ContainerComponent>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    backgroundColor: appColors.cardBg,
  },
});

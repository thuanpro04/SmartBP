import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import {
  BloodPressureOverviewCard,
  ButtonComponent,
  CustomDoubleBarChart,
  RowComponent,
  SpacingComponent,
  TextComponent,
} from '../components/layout';
import CardBloodPressure from '../components/layout/CardBloodPressure';
import { userServices } from '../services/userServices';
import { measureInfo } from '../../utils/type/user.type';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/slices/authSlices';
import { useFocusEffect } from '@react-navigation/native';
import LoadingModal from '../components/modal/LoadingModal';
import { formatDate } from '../../utils/format';
const BloodPeressureScreen = ({ navigation }: any) => {
  const [selectedFeature, setSelectedFeature] = useState('Mới nhất');
  const [indexFature, setIndexFature] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [measureInfo, setMeasureInfo] = useState<measureInfo[]>([]);
  const profile = useSelector(authSelector);
  const bloodPressureData = [
    {
      title: 'Tâm thu',
      unit: 'mmHg',
      value: measureInfo[indexFature]?.systolic ?? 0,
      color: appColors.systolic,
    },
    {
      title: 'Tâm trương',
      unit: 'mmHg',
      value: measureInfo[indexFature]?.diastolic ?? 0,
      color: appColors.diastolic,
    },
    {
      title: 'Xung giao động',
      unit: 'bmp',
      value: measureInfo[indexFature]?.pulse ?? 0,
      color: appColors.pulse,
    },
  ];

  const chartData = [
    {
      date: formatDate(measureInfo[0]?.timestamp),
      systolic: measureInfo[0]?.systolic,
      diastolic: measureInfo[0]?.diastolic,
      pulse: measureInfo[0]?.pulse,
    },
    {
      date: formatDate(measureInfo[1]?.timestamp),
      systolic: measureInfo[1]?.systolic,
      diastolic: measureInfo[1]?.diastolic,
      pulse: measureInfo[1]?.pulse,
    },
    {
      date: formatDate(measureInfo[2]?.timestamp),
      systolic: measureInfo[2]?.systolic,
      diastolic: measureInfo[2]?.diastolic,
      pulse: measureInfo[2]?.pulse,
    },
  ];
  const getMeasureInfo = async () => {
    setIsLoading(true);
    try {
      const res = await userServices.getMeasureInfo(profile._id);
      if (res && res.data) {
        console.log(res.data.message, res.data.result);
        setMeasureInfo(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('Get measure info error: ', error);
      setIsLoading(false);
    }
  };
  const onChangeFeature = () => {
    const arr = ['Mới nhất', 'Hôm qua', 'Hôm kia'];
    const currentIndex = arr.indexOf(selectedFeature);
    const nextIndex = (currentIndex + 1) % arr.length;
    setSelectedFeature(arr[nextIndex]);
    setIndexFature(nextIndex);
  };
  useFocusEffect(
    useCallback(() => {
      getMeasureInfo();
    }, []),
  );
  const CardHeader = () => {
    return (
      <View style={styles.card}>
        <RowComponent>
          <ButtonComponent onPress={onChangeFeature}>
            <Entypo
              name="chevron-left"
              size={appSizes.iconM}
              color={appColors.title}
            />
          </ButtonComponent>
          <TextComponent label={selectedFeature} style={styles.cardTitle} />
          <ButtonComponent onPress={onChangeFeature}>
            <Entypo
              name="chevron-right"
              size={appSizes.iconM}
              color={appColors.title}
            />
          </ButtonComponent>
        </RowComponent>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <CardHeader />
      <BloodPressureOverviewCard data={bloodPressureData} />
      <View style={styles.barContainer}>
        <CustomDoubleBarChart
          data={chartData}
          nameCol1="Tâm thu"
          nameCol2="Tâm trương"
          titleChart="Biểu đồ huyết áp"
        />
      </View>
      {measureInfo.map((item, index) => (
        <CardBloodPressure
          item={item}
          key={item._id}
          onNavigation={() => navigation.navigate('record')}
        />
      ))}
      <SpacingComponent height={32} />
      <LoadingModal
        visible={isLoading}
        type="download"
        message="Đang tải xuống..."
        subMessage="Đang lấy lịch sử đo"
      />
    </ScrollView>
  );
};

export default BloodPeressureScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    marginTop: 8,
    flex: 1,
  },
  card: {
    backgroundColor: appColors.cardBg,
    padding: 10,
    borderRadius: 50,
  },
  cardTitle: {
    fontWeight: '600',
    color: appColors.title,
  },
  btn: { backgroundColor: 'transparent' },
  barContainer: {
    marginTop: 10,
  },
});

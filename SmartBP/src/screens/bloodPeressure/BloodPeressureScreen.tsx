import React, { useState } from 'react';
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
const BloodPeressureScreen = ({ navigation }: any) => {
  const [selectedFeature, setSelectedFeature] = useState('Mới nhất');
  const bloodPressureData = [
    {
      title: 'Tâm thu',
      unit: 'mmHg',
      value: 56,
      color: appColors.systolic,
    },
    {
      title: 'Tâm trương',
      unit: 'mmHg',
      value: 56,
      color: appColors.diastolic,
    },
    {
      title: 'Xung giao động',
      unit: 'bmp',
      value: 22,
      color: appColors.pulse,
    },
  ];
  const chartData = [
    {
      date: '16/5',
      systolic: 120,
      diastolic: 80,
      pulse: 72,
    },
    {
      date: '20/5',
      systolic: 115,
      diastolic: 75,
      pulse: 70,
    },
    {
      date: '25/5',
      systolic: 125,
      diastolic: 85,
      pulse: 74,
    },
  ];

  const onChangeFeature = () => {
    const arr = ['Mới nhất', 'Hôm qua', 'Hôm kia'];
    const currentIndex = arr.indexOf(selectedFeature);
    const nextIndex = (currentIndex + 1) % arr.length;
    setSelectedFeature(arr[nextIndex]);
  };
  const CardHeader = () => {
    return (
      <View style={styles.card}>
        <RowComponent>
          <ButtonComponent onPress={onChangeFeature}>
            <Entypo
              name="chevron-left"
              size={appSizes.iconL}
              color={appColors.title}
            />
          </ButtonComponent>
          <TextComponent label={selectedFeature} style={styles.cardTitle} />
          <ButtonComponent onPress={onChangeFeature}>
            <Entypo
              name="chevron-right"
              size={appSizes.iconL}
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
      {chartData.map((item, index) => (
        <CardBloodPressure
          item={item}
          key={index}
          onNavigation={() => navigation.navigate('record')}
        />
      ))}
      <SpacingComponent height={32} />
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

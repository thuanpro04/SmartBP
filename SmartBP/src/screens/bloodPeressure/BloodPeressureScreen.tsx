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
  TextComponent,
} from '../components/layout';
import CardBloodPressure from '../components/layout/CardBloodPressure';
const BloodPeressureScreen = () => {
  const [selectedFeature, setSelectedFeature] = useState('Latest');
  const bloodPressureData = [
    {
      title: 'Sytolic',
      unit: 'mmHg',
      value: 56,
      color: appColors.systolic,
    },
    {
      title: 'Diastolic',
      unit: 'mmHg',
      value: 56,
      color: appColors.diastolic,
    },
    {
      title: 'Pulse',
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
    const arr = ['Latest', 'Older', 'Oldest'];
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
          <ButtonComponent onPress={() => console.log('next')}>
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
          nameCol1="Systolic"
          nameCol2="Diastolic"
          titleChart="Biểu đồ huyết áp"
        />
      </View>
      {chartData.map((item, index) => (
        <CardBloodPressure item={item} key={index} />
      ))}
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

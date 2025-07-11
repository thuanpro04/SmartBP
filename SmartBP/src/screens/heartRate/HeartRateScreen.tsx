import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  BloodPressureOverviewCard,
  ContainerComponent,
  CustomDoubleBarChart,
} from '../components/layout';
import { appColors } from '../../utils/appColors';

const HeartRateScreen = () => {
  const heartRateData = [
    {
      title: 'Trung bình',
      unit: 'BMP',
      value: 0,
      color: appColors.systolic,
    },
    {
      title: 'Lớn nhất',
      unit: 'BPM',
      value: 0,
      color: appColors.diastolic,
    },
    {
      title: 'Nhỏ nhất',
      unit: 'BMP',
      value: 0,
      color: appColors.pulse,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <BloodPressureOverviewCard data={heartRateData} />
        <CustomDoubleBarChart data={[]} nameCol1='Lớn nhất' nameCol2='Nhỏ nhất' titleChart='Biểu đồ nhịp tim' />
    </ScrollView>
  );
};

export default HeartRateScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    marginTop: 8,
    flex: 1,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CardBloodPressure } from '../components/layout';

const BloodHistoryScreen = () => {
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
  return (
    <View style={{paddingHorizontal:12}}>
      {chartData.map((item, index) => (
        <CardBloodPressure item={item} key={index} />
      ))}
    </View>
  );
};

export default BloodHistoryScreen;

const styles = StyleSheet.create({});

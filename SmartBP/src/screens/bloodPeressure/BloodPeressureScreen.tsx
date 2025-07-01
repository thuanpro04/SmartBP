import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  ButtonComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import Entypo from 'react-native-vector-icons/Entypo';
import { appSizes } from '../../utils/appSizes';
import { appColors } from '../../utils/appColors';
const { height, width } = Dimensions.get('window');
const BloodPeressureScreen = () => {
  const [selectedFeature, setSelectedFeature] = useState('Latest');
  const dataUser = [
    {
      title: 'Sytolic',
      unit: 'mmHg',
      value: 56,
      color: appColors.Systolic,
    },
    {
      title: 'Diastolic',
      unit: 'mmHg',
      value: 56,
      color: appColors.diastolic,
    },
    {
      title: 'Sytolic',
      unit: 'BMP',
      value: 22,
      color: appColors.pulse,
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
  const CardBody = () => {
    return (
      <View style={styles.cardBody}>
        {dataUser.map((item, index) => (
          <RowComponent style={styles.row} key={index}>
            <View style={styles.labelGroup}>
              <TextComponent label={item.title} style={styles.labelTitle} />
              <TextComponent label={item.unit} style={styles.labelUnit} />
            </View>
            <TextComponent
              label={item.value.toString()}
              style={[styles.value, { color: item.color }]}
            />
          </RowComponent>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CardHeader />
      <CardBody />
    </View>
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
  cardBody: {
    backgroundColor: appColors.cardBg,
    marginVertical: 22,
    padding: 16,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  row: {
    paddingVertical: 6,
  },
  labelGroup: {
    paddingVertical: 4,
  },
  labelTitle: {
    fontWeight: '500',
  },
  labelUnit: {
    color: appColors.textSecondary,
    fontSize: appSizes.large,
  },
  value: {
    fontSize: appSizes.xxxLarge,
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { appColors } from '../../../utils/appColors';
import { appSizes } from '../../../utils/appSizes';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { Edit, Edit2 } from 'iconsax-react-native';
import MarqueeText from './MarqueeText';
import ButtonComponent from './ButtonComponent';
import { formatFullDate, getBloodPressureStatus } from '../../../utils/format';
const CardBloodPressure = ({ item, onNavigation }: any) => {
  const statusBP = getBloodPressureStatus(item.systolic, item.diastolic);
  return (
    <RowComponent style={styles.container}>
      <View style={styles.valueContainer}>
        <TextComponent label={item.systolic} style={styles.value} />
        <TextComponent label={item.diastolic} style={styles.value} />
      </View>
      <View style={styles.barrier} />
      <View style={styles.noteContainer}>
        <TextComponent
          label={formatFullDate(item.timestamp)}
          style={styles.date}
        />

        <MarqueeText
          labelStyle={[
            styles.notifi,
            {
              color: statusBP.color,
            },
          ]}
          style={{ width: '110%' }}
          label={statusBP.text}
        />

        <TextComponent
          label={`Nhịp tim: ${item.pulse} BPM`}
          style={styles.date}
        />
      </View>

      <ButtonComponent onPress={onNavigation} style={styles.btnEdit}>
        <Edit2 color={appColors.iconDefault} size={appSizes.iconS} />
      </ButtonComponent>
    </RowComponent>
  );
};

export default CardBloodPressure;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.cardBg,
    borderRadius: appSizes.radiusL,
    padding: 16,
    marginTop: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
    justifyContent: 'flex-start',
  },
  valueContainer: {
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    fontSize: appSizes.xxxLarge,
  },
  barrier: {
    height: '100%',
    width: 10,
    backgroundColor: appColors.barrier,
    borderRadius: 12,
  },
  noteContainer: {
    paddingVertical: 6,
    flex: 1,
  },
  date: {
    fontSize: appSizes.medium,
    color: '#666',
  },
  notifi: {
    fontWeight: 'bold',
    fontSize: appSizes.xxxLarge,
  },
  btnEdit: {},
});

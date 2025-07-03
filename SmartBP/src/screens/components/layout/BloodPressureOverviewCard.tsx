import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import CustomDoubleBarChart from './CustomDoubleBarChart';
import { appColors } from '../../../utils/appColors';
import { appSizes } from '../../../utils/appSizes';
interface Props {
  data: any;
}
const BloodPressureOverviewCard = (props: Props) => {
  const { data } = props;
  return (
    <View>
      <View style={styles.cardBody}>
        {data.map((item: any, index: number) => {
          const colorValue =
            item.value.toString() === '0' ? appColors.error : item.color;
          return (
            <RowComponent style={styles.row} key={index}>
              <View style={styles.labelGroup}>
                <TextComponent label={item.title} style={styles.labelTitle} />
                <TextComponent label={item.unit} style={styles.labelUnit} />
              </View>
              <TextComponent
                label={item.value.toString()}
                style={[styles.value, { color: colorValue }]}
              />
            </RowComponent>
          );
        })}
      </View>
    </View>
  );
};

export default BloodPressureOverviewCard;

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: appColors.cardBg,
    marginVertical: 22,
    padding: 16,
    borderRadius: appSizes.radiusL,
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

  barChart: {
    backgroundColor: appColors.cardBg,
    borderRadius: 12,
    padding: 16,
  },
});

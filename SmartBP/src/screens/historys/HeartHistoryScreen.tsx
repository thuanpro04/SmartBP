import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RowComponent, TextComponent } from '../components/layout';
import { Edit2 } from 'iconsax-react-native';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';

const HeartHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <RowComponent style={styles.card}>
        <View style={styles.valueContainer}>
          <TextComponent label="100" style={styles.value} />
          <TextComponent label="❤️ BPM" style={styles.unit} />
        </View>
        <View style={styles.barrier} />
        <View style={styles.noteContainer}>
          <TextComponent label="15:38, 15/06/2023" style={styles.date} />
          <TextComponent label="Normal" style={styles.notifi} />
        </View>
        <Edit2 color={appColors.iconDefault} size={appSizes.iconS} />
      </RowComponent>
    </View>
  );
};

export default HeartHistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginTop: 12,
  },
  card: {
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
  barrier: {
    height: '100%',
    width: 10,
    backgroundColor: appColors.barrier,
    borderRadius: 12,
  },
  valueContainer: { alignItems: 'center' },
  value: {
    fontWeight: 'bold',
    fontSize: appSizes.xxxLarge + 10,
  },
  unit: {
    fontSize: appSizes.small,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  date: {
    fontSize: appSizes.medium,
    color: '#666',
  },
  notifi: {
    fontWeight: 'bold',
    fontSize: appSizes.xxxLarge,
    color: appColors.barrier,
    paddingTop: 12,
  },
  noteContainer: {
    flex: 1,
  },
});

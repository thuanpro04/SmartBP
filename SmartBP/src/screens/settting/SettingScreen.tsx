import React from 'react';
import { StyleSheet, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { appColors } from '../../utils/appColors';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SpacingComponent,
  TextComponent,
} from '../components/layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appSizes } from '../../utils/appSizes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SettingScreen = () => {
  return (
    <ContainerComponent style={{ paddingBottom: 0 }}>
      <HeaderComponent title="Settings" style={styles.header} />
      <View style={styles.main}>
        <View style={styles.card}>
          <RowComponent style={styles.row}>
            <FontAwesome
              name="language"
              size={appSizes.iconM}
              color={appColors.primary}
            />
            <TextComponent label="Language Options" />
          </RowComponent>
          <RowComponent style={styles.row}>
            <Fontisto
              name="export"
              size={appSizes.iconM}
              color={appColors.primary}
            />
            <TextComponent label="Export as file" />
          </RowComponent>
        </View>

        <View style={styles.card}>
          <ButtonComponent onPress={() => {}} style={styles.btnCard}>
            <RowComponent style={styles.row}>
              <FontAwesome
                name="star"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Rate Us" />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent onPress={() => {}} style={styles.btnCard}>
            <RowComponent style={styles.row}>
              <Fontisto
                name="share"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Share with Friends" />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent onPress={() => {}} style={styles.btnCard}>
            <RowComponent style={styles.row}>
              <MaterialIcons
                name="feedback"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Feedback" />
            </RowComponent>
          </ButtonComponent>
        </View>
      </View>
    </ContainerComponent>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  main: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  card: {
    padding: 16,
    backgroundColor: appColors.cardBg,
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  row: {
    justifyContent: 'flex-start',
    paddingVertical: 12,
  },
  btnCard: {
    backgroundColor: 'transparent',
  },
});

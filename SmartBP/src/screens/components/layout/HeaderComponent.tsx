import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { appSizes } from '../../../utils/appSizes';
import { appColors } from '../../../utils/appColors';
import ButtonComponent from './ButtonComponent';
interface Props {
  title: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  icon?: ReactNode;
}
const HeaderComponent = (props: Props) => {
  const { title, text, style, onPress, icon } = props;
  return (
    <RowComponent style={[styles.container, style]}>
      {icon && icon}
      <TextComponent label={title} style={styles.title} />
      {text && (
        <ButtonComponent onPress={onPress} style={styles.btn}>
          <TextComponent label={text} style={styles.text} />
        </ButtonComponent>
      )}
    </RowComponent>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: appColors.cardBg,
  },
  title: {
    fontSize: appSizes.xxxLarge,
    fontWeight: 'bold',
    color: appColors.primary,
    flex: 1,
  },
  text: {
    fontSize: appSizes.xLarge,
    color: appColors.textPrimary,
    fontStyle: 'italic',
    fontWeight: '300',
  },
  btn: {},
});

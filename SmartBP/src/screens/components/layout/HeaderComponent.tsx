import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { appSizes } from '../../../utils/appSizes';
import { appColors } from '../../../utils/appColors';
import ButtonComponent from './ButtonComponent';
interface Props {
  title: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
}
const HeaderComponent = (props: Props) => {
  const { title, text, style } = props;
  return (
    <RowComponent style={[styles.container, style]}>
      <TextComponent label={title} style={styles.title} />
      {text && (
        <TouchableOpacity onPress={() => console.log('History')}>
          <TextComponent label={text} style={styles.text} />
        </TouchableOpacity>
      )}
    </RowComponent>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: appSizes.xxxLarge,
    fontWeight: 'bold',
    color: appColors.primary,
  },
  text: {
    fontSize: appSizes.xLarge,
    color: appColors.textPrimary,
  },
});

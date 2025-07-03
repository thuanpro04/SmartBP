import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { appSizes } from '../../../utils/appSizes';
import { appColors } from '../../../utils/appColors';
interface Props {
  label: string;
  style?: StyleProp<TextStyle>;
  numberOfLine?: number;
}
const TextComponent = (props: Props) => {
  const { label, style, numberOfLine } = props;
  return (
    <Text style={[styles.textStyle, style]} numberOfLines={numberOfLine}>
      {label}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: appSizes.xxLarge,
    color: appColors.textPrimary,
  },
});

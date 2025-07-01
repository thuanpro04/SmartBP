import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
interface Props {
  label: string;
  style?: StyleProp<TextStyle>;
}
const TextComponent = (props: Props) => {
  const { label, style } = props;
  return <Text style={[styles.textStyle, style]}>{label}</Text>;
};

export default TextComponent;

const styles = StyleSheet.create({
  textStyle: {},
});

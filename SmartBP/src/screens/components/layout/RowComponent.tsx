import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
const RowComponent = (props: Props) => {
  const { children, style } = props;
  return <View style={[styles.container, style]}>{children}</View>;
};

export default RowComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

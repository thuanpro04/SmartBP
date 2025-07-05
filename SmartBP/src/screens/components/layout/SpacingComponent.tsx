import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
interface Props {
  width?: number;
  height?: number;
}
const SpacingComponent = (props: Props) => {
  const { height, width } = props;
  return <View style={{ width: width, height: height }} />;
};

export default SpacingComponent;

const styles = StyleSheet.create({});

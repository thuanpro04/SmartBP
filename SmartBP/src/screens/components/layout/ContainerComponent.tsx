import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactNode, use } from 'react';

import { appColors } from '../../../utils/appColors';
interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ContainerComponent = (props: Props) => {
  const { children, style } = props;
  //   const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[localStyles.container, {}, style]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      {children}
    </SafeAreaView>
  );
};

export default ContainerComponent;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
    paddingTop: 23,
    paddingHorizontal: 16,
  },
});

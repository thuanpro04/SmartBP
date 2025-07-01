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
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
const ContainerComponent = (props: Props) => {
  const { children, style } = props;
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider
      style={[
        localStyles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      {children}
    </SafeAreaProvider>
  );
};

export default ContainerComponent;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
});

import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  activeOpacity?: number;
}
const ButtonComponent = (props: Props) => {
  const { style, children, onPress, disabled, activeOpacity } = props;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    if (!disabled) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[style ?? localStyles.backButton]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const localStyles = StyleSheet.create({
  backButton: {
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

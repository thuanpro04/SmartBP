import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
interface Props {
  style?: StyleProp<ViewStyle>;
  speed?: number;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}
const MarqueeText = (props: Props) => {
  const { style, speed = 2, label, labelStyle } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const startAnimation = () => {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 10000 ,
          useNativeDriver: true,
        }),
      ).start();
    };
    setTimeout(startAnimation, 500);
  }, []);
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [200, -300],
              }),
            },
          ],
        }}
      >
        <Text
          style={[{ fontSize: 24 }, labelStyle]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Animated.View>
    </View>
  );
};

export default MarqueeText;

const styles = StyleSheet.create({});

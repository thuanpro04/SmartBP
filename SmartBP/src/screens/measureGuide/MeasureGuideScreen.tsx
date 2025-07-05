import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import { Add } from 'iconsax-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const MeasureGuideScreen = ({ navigation }: any) => {
  const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Animation refs for heartbeat lines
  const leftLineAnim = useRef(new Animated.Value(0)).current;
  const rightLineAnim = useRef(new Animated.Value(0)).current;

  // Create heartbeat wave animation
  const createHeartbeatWave = (
    animValue: Animated.Value,
    delay: number = 0,
  ) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        // Đường thẳng ban đầu
        Animated.timing(animValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        // Đỉnh nhọn đầu tiên (nhỏ)
        Animated.timing(animValue, {
          toValue: 30,
          duration: 50,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: -20,
          duration: 30,
          useNativeDriver: false,
        }),
        // Đỉnh chính (cao nhất)
        Animated.timing(animValue, {
          toValue: 80,
          duration: 40,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: -60,
          duration: 40,
          useNativeDriver: false,
        }),
        // Đỉnh thứ ba (trung bình)
        Animated.timing(animValue, {
          toValue: 40,
          duration: 35,
          useNativeDriver: false,
        }),
        // Về đường thẳng
        Animated.timing(animValue, {
          toValue: 0,
          duration: 45,
          useNativeDriver: false,
        }),
        // Nghỉ giữa các nhịp
        Animated.delay(400),
      ]),
    );
  };

  useEffect(() => {
    if (start) {
      // Start heartbeat wave animations với delay khác nhau
      createHeartbeatWave(leftLineAnim, 0).start();
      createHeartbeatWave(rightLineAnim, 200).start(); // Delay 200ms cho hiệu ứng

      // Start percentage counter
      const interval = setInterval(() => {
        setPercentage(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [start]);

  const onStartMeasure = () => {
    setStart(true);
    setPercentage(1);
  };

  // Create heartbeat line component
  const HeartbeatLine = ({
    animValue,
    isLeft,
  }: {
    animValue: Animated.Value;
    isLeft: boolean;
  }) => {
    const lineHeight = animValue.interpolate({
      inputRange: [-60, 0, 80],
      outputRange: [1, 3, 8],
      extrapolate: 'clamp',
    });

    const lineOpacity = animValue.interpolate({
      inputRange: [-60, 0, 80],
      outputRange: [0.8, 0.6, 1],
      extrapolate: 'clamp',
    });

    const lineColor = animValue.interpolate({
      inputRange: [-60, 0, 80],
      outputRange: [
        'rgba(255, 69, 69, 0.8)',
        'rgba(255, 69, 69, 0.6)',
        'rgba(255, 69, 69, 1)',
      ],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={[
          styles.heartbeatContainer,
          isLeft ? styles.leftLine : styles.rightLine,
        ]}
      >
        {/* Tạo nhiều đường để mô phỏng sóng heartbeat */}
        {[...Array(20)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.heartbeatSegment,
              {
                height: lineHeight,
                opacity: lineOpacity,
                backgroundColor: lineColor,
                marginLeft: index * 2,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <ContainerComponent>
      <HeaderComponent
        title="Measure Guide"
        onPress={() => navigation.goBack()}
        text="Cancel"
        style={styles.header}
      />
      <View style={styles.main}>
        <View style={styles.heart}>
          <RowComponent>
            <View style={[styles.roundHeart, { marginRight: -24 }]}>
              {start && (
                <HeartbeatLine animValue={leftLineAnim} isLeft={true} />
              )}
            </View>
            <Image
              source={require('../../assets/images/heart.png')}
              style={styles.image}
            />
            <View style={[styles.roundHeart, { marginLeft: -24 }]}>
              {start && (
                <HeartbeatLine animValue={rightLineAnim} isLeft={false} />
              )}
            </View>
          </RowComponent>
          <ButtonComponent style={styles.btnStart} onPress={onStartMeasure}>
            {start ? (
              <TextComponent label={`${percentage}%`} style={styles.percent} />
            ) : (
              <>
                <TextComponent label="START" style={styles.titleBtn} />
                <TextComponent
                  label="Tab to measure"
                  style={styles.description}
                />
              </>
            )}
          </ButtonComponent>
        </View>
        {!start ? (
          <ButtonComponent
            onPress={() => navigation.navigate('record')}
            style={styles.btnAdd}
          >
            <RowComponent>
              <Add size={appSizes.iconM} color={appColors.pulse} />
              <TextComponent label="Add Manually" style={styles.labelBtn} />
            </RowComponent>
          </ButtonComponent>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <RowComponent style={{ gap: 0 }}>
              <TextComponent
                label="0"
                style={[styles.value, { opacity: 0.3 }]}
              />
              <TextComponent label="00" style={styles.value} />
            </RowComponent>
            <TextComponent
              label="Beat per minute"
              style={{ fontStyle: 'italic', fontWeight: '200' }}
            />
          </View>
        )}
      </View>
    </ContainerComponent>
  );
};

export default MeasureGuideScreen;

const styles = StyleSheet.create({
  header: {
    borderBottomColor: appColors.border,
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
    backgroundColor: appColors.background,
    padding: 16,
  },
  heart: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  roundHeart: {
    height: 3,
    backgroundColor: appColors.error,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heartbeatContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    width: '100%',
  },
  leftLine: {
    justifyContent: 'flex-end',
  },
  rightLine: {
    justifyContent: 'flex-start',
  },
  heartbeatSegment: {
    width: 2,
    backgroundColor: appColors.error,
    marginHorizontal: 0.5,
  },
  btnStart: {
    position: 'absolute',
    bottom: '45%',
  },
  titleBtn: {
    fontWeight: 'bold',
    color: appColors.cardBg,
    fontSize: appSizes.xxxLarge,
    marginLeft: 8,
  },
  description: {
    fontSize: appSizes.large,
    color: appColors.cardBg,
  },
  btnAdd: {
    borderWidth: 1,
    borderColor: appColors.disabled,
    borderRadius: 50,
    backgroundColor: appColors.cardBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  labelBtn: {
    flex: 1,
    textAlign: 'center',
    color: appColors.primary,
    fontWeight: '500',
  },
  percent: {
    fontWeight: '900',
    color: appColors.cardBg,
    fontSize: appSizes.xxxLarge,
  },
  value: {
    fontWeight: '900',
    fontSize: 90,
    color: appColors.error,
  },
});

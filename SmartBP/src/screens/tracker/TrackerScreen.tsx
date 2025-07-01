import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
} from 'react-native';
import React, { useRef, useState } from 'react';
import {
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import BloodPeressureScreen from '../bloodPeressure/BloodPeressureScreen';
import HeartRateScreen from '../heartRate/HeartRateScreen';

const TrackerScreen = () => {
  const [selectedScreen, setSelectedScreen] = useState('bloodPressure');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isScreen = selectedScreen === 'bloodPressure';
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(isScreen ? 0 : 1)).current;

  const onChangeScreen = (key: string) => {
    if (selectedScreen === key || isTransitioning) {
      return;
    }

    setIsTransitioning(true);

    // Tạo animation sequence mượt mà hơn
    const animationSequence = Animated.sequence([
      // Phase 1: Fade out và scale down nội dung hiện tại
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: key === 'bloodPressure' ? -50 : 50,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      
      // Phase 2: Đổi nội dung và animate tab indicator
      Animated.parallel([
        Animated.timing(tabIndicatorAnim, {
          toValue: key === 'bloodPressure' ? 0 : 1,
          duration: 400,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false, // Vì chúng ta dùng cho layout
        }),
      ]),
      
      // Phase 3: Fade in và scale up nội dung mới
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    // Đổi screen sau khi fade out hoàn thành
    setTimeout(() => {
      setSelectedScreen(key);
    }, 300);

    // Chạy animation và reset trạng thái
    animationSequence.start(() => {
      setIsTransitioning(false);
    });
  };

  const TabTopNavigation = () => {
    return (
      <View style={styles.tabContainer}>
        <RowComponent style={{ justifyContent: 'space-evenly' }}>
          <TouchableOpacity
            onPress={() => onChangeScreen('bloodPressure')}
            style={styles.tabScreen}
            disabled={isTransitioning}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabIndicatorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1.05, 1],
                    }),
                  },
                ],
              }}
            >
              <TextComponent
                label="Blood Pressure"
                style={[
                  styles.nameScreen,
                  {
                    color: isScreen ? appColors.primary : appColors.textSecondary,
                  },
                ]}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onChangeScreen('heartRate')}
            style={styles.tabScreen}
            disabled={isTransitioning}
          >
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabIndicatorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <TextComponent
                label="Heart Rate"
                style={[
                  styles.nameScreen,
                  {
                    color: !isScreen
                      ? appColors.primary
                      : appColors.textSecondary,
                  },
                ]}
              />
            </Animated.View>
          </TouchableOpacity>
        </RowComponent>
        
        {/* Animated bottom bar */}
        <View style={styles.bottomBarContainer}>
          <Animated.View
            style={[
              styles.animatedBottomBar,
              {
                backgroundColor: appColors.primary,
                transform: [
                  {
                    translateX: tabIndicatorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.bottomBarBackground} />
        </View>
      </View>
    );
  };

  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent title="Tracker" text="History" />
        <TabTopNavigation />
      </View>
      
      {/* Content với animation mượt mà */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateX: slideAnim },
          ],
        }}
      >
        {isScreen ? <BloodPeressureScreen /> : <HeartRateScreen />}
      </Animated.View>
      
      {/* Loading overlay khi đang transition */}
      {isTransitioning && (
        <Animated.View
          style={[
            styles.transitionOverlay,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0],
              }),
            },
          ]}
        />
      )}
    </ContainerComponent>
  );
};

export default TrackerScreen;

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: appColors.cardBg,
  },
  tabContainer: {
    marginTop: 28,
  },
  tabScreen: {
    paddingBottom: 16,
  },
  nameScreen: {
    paddingHorizontal: 16,
    fontSize: appSizes.xLarge,
    fontWeight: '700',
  },
  bottomBarContainer: {
    position: 'relative',
    height: 6,
    borderBottomColor: appColors.border,
    borderBottomWidth: 2,
  },
  bottomBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: appColors.border,
    borderRadius: 3,
  },
  animatedBottomBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: 6,
    borderRadius: 3,
    zIndex: 1,
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 999,
  },
});

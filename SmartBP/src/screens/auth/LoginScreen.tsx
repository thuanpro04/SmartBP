import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  Animated,
  Image,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { RowComponent, TextComponent } from '../components/layout';
import { Google } from '../../assets/svgs';
import axiosIntance from '../api/axiosIntance';
import { API_PATHS } from '../api/apiPath';
import { useDispatch } from 'react-redux';
import { addAuth } from '../redux/slices/authSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../../utils/type/user.type';
import { displayNotification } from '../../utils/displayNotifice';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Khởi tạo animations
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Pulse animation for heart icon
    const createPulseAnimation = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => createPulseAnimation());
    };
    createPulseAnimation();
  }, []);
  async function SaveLoginForUser(user: UserType) {
    try {
      setIsLoading(true);
      const res = await axiosIntance.post(API_PATHS.AUTH.LOGIN, user);
      if (res && res.data) {
        const user = res.data.user;
        dispatch(addAuth(user));
        AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('Save data user successfully !!!', user);
      }
    } catch (error) {
      console.log('Save user info fail: ', error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleLoginGoogle() {
    try {
      setIsSigninInProgress(true);
      console.log('Bắt đầu đăng nhập Google...');
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('Play Services OK');
      const response = await GoogleSignin.signIn();
      if (response.data?.user) {
        console.log('User info:', response.data.user);
        const userInfo: any = response.data.user;
        await SaveLoginForUser(userInfo);
        displayNotification.activity(
          'success',
          'Chào mừng bạn đã đến với SmartBP',
          userInfo.name,
        );
      }
    } catch (error: any) {
      console.log('Lỗi đăng nhập Google:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Đã hủy', 'Đăng nhập bị hủy');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Đang xử lý', 'Đang trong quá trình đăng nhập');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Lỗi', 'Play Services không khả dụng');
      } else {
        Alert.alert('Lỗi', `Lỗi: ${error.message}\nCode: ${error.code}`);
      }
    } finally {
      setIsSigninInProgress(false);
    }
  }

  useEffect(() => {
    console.log('Cấu hình Google Sign-In...');
    GoogleSignin.configure({
      webClientId: process.env.WEBCLIENTID,
    });
  }, []);

  return (
    <LinearGradient
      colors={['#FF6B6B', '#FF8E53', '#FFB400']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />

      {/* Decorative Circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo/Icon Section */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[styles.logoWrapper, { transform: [{ scale: pulseAnim }] }]}
          >
            <Icon name="favorite" size={60} color="#FF6B35" />
          </Animated.View>
          <View style={styles.pulseIndicator}>
            <View style={styles.pulseWave} />
            <View style={[styles.pulseWave, styles.pulseWaveDelay]} />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <TextComponent label="BloodPressure" style={styles.mainTitle} />
          <TextComponent label="Monitor" style={styles.subTitle} />
          <Text style={styles.description}>
            Theo dõi huyết áp thông minh{'\n'}
            Kết nối với thiết bị IoT
          </Text>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isSigninInProgress && styles.loginButtonDisabled,
          ]}
          onPress={handleLoginGoogle}
          disabled={isSigninInProgress}
          activeOpacity={0.8}
        >
          <RowComponent style={styles.buttonContent}>
            {isSigninInProgress ? (
              <View style={styles.loadingContainer}>
                <View style={styles.spinner} />
                <TextComponent
                  label="Đang đăng nhập..."
                  style={styles.buttonText}
                />
              </View>
            ) : (
              <>
                <Google />
                <TextComponent
                  label="Đăng nhập với Google"
                  style={styles.buttonText}
                />
              </>
            )}
          </RowComponent>
        </TouchableOpacity>

        {/* Features Section */}
        <RowComponent style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Icon name="monitor-heart" size={20} color="#FFFFFF" />
            <TextComponent label="Đo huyết áp" style={styles.featureText} />
          </View>
          <View style={styles.featureItem}>
            <Icon name="analytics" size={20} color="#FFFFFF" />
            <TextComponent label="Thống kê" style={styles.featureText} />
          </View>
          <View style={styles.featureItem}>
            <Icon name="notifications" size={20} color="#FFFFFF" />
            <TextComponent label="Nhắc nhở" style={styles.featureText} />
          </View>
        </RowComponent>
      </Animated.View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35', // Coral Orange - màu chính
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(135deg, #FF6B35 0%, #FFB400 100%)',
    opacity: 1,
  },
  circle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 180, 0, 0.2)', // #FFB400 với opacity
  },
  circle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  circle3: {
    position: 'absolute',
    top: '30%',
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(52, 152, 219, 0.1)', // Soft blue accent
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Trắng trong suốt
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFB400', // Sử dụng #FFB400 cho border
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  pulseIndicator: {
    marginTop: 15,
    alignItems: 'center',
  },
  pulseWave: {
    width: 60,
    height: 4,
    backgroundColor: '#FFB400', // Sử dụng #FFB400 cho sóng nhịp
    borderRadius: 2,
    marginVertical: 2,
  },
  pulseWaveDelay: {
    width: 40,
    opacity: 0.7,
    backgroundColor: '#FFB400',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    width: width * 0.8,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#FFB400', // Border #FFB400
  },
  loginButtonDisabled: {
    opacity: 0.6,
    backgroundColor: '#F5F5F5',
  },
  buttonContent: {
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 12,
    color: '#FF6B35', // Coral Orange cho icon Google
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50', // Dark blue-gray cho text
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderTopColor: 'transparent',
    marginRight: 10,
  },
  featuresContainer: {
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 180, 0, 0.3)', // #FFB400 border
  },
  featureText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
});

import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { appColors } from '../../../utils/appColors';
import { TextComponent } from '../layout';
interface Props {
  visible: boolean;
  message: string;
  subMessage: string;
  type: 'upload' | 'download' | 'sync' | 'login' | 'default';
}
const { width, height } = Dimensions.get('window');
const LoadingModal = (props: Props) => {
  const { visible, message, subMessage, type = 'default' } = props;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100, // xác định đọ căng
        friction: 8, // giao động
        useNativeDriver: true,
      }).start();
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      );
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      );
      const dotsAnimation = Animated.loop(
        Animated.stagger(
          200,
          dotsAnim.map(dot =>
            Animated.sequence([
              Animated.timing(dot, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(dot, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }),
            ]),
          ),
        ),
      );
      rotateAnimation.start();
      pulseAnimation.start();
      dotsAnimation.start();
      return () => {
        rotateAnimation.stop();
        pulseAnimation.stop();
        dotsAnimation.stop();
      };
    } else {
      Animated.spring(scaleAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      });
    }
  }, [visible]);
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const getLoadingIcon = () => {
    const iconStyle = {
      transform: [{ scale: pulseAnim }, { rotate: rotateInterpolate }],
    };

    switch (type) {
      case 'upload':
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.uploadIcon}>
              <TextComponent label="☁️" style={styles.iconText} />
              <TextComponent label="↗️" style={styles.arrowText} />
            </View>
          </Animated.View>
        );
      case 'download':
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.downloadIcon}>
              <TextComponent label="📥" style={styles.iconText} />
              <TextComponent label="⬇️" style={styles.arrowText} />
            </View>
          </Animated.View>
        );
      case 'sync':
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.syncIcon}>
              <TextComponent label="🔄" style={styles.iconText} />
            </View>
          </Animated.View>
        );
      case 'login':
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.loginIcon}>
              <TextComponent label="🔐" style={styles.iconText} />
            </View>
          </Animated.View>
        );
      default:
        return (
          <Animated.View style={[styles.iconContainer, iconStyle]}>
            <View style={styles.defaultIcon}>
              <View style={styles.spinner}>
                <View style={styles.spinnerInner} />
              </View>
            </View>
          </Animated.View>
        );
    }
  };
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.iconSection}>{getLoadingIcon()}</View>
          <View style={styles.dotsContainer}>
            {dotsAnim.map((dot, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: dot,
                    transform: [
                      {
                        scale: dot.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1.2],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.messageContainer}>
            <TextComponent label={message} style={styles.mainMessage} />
            <TextComponent label={subMessage} style={styles.subMessage} />
          </View>
          {/* Progress Ring */}
          <View style={styles.progressRing}>
            <Animated.View
              style={[
                styles.progressRingInner,
                {
                  transform: [{ rotate: rotateInterpolate }],
                  borderTopColor: '#4299E1',
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    maxWidth: 320,
    backgroundColor: appColors.cardBg,
    borderRadius: 25,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 25,
  },
  iconSection: {
    marginBottom: 25,
  },
  iconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#E2E8F0',
    borderTopColor: '#4299E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF8FF',
  },
  uploadIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#E6FFFA',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  downloadIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FED7E2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  syncIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FEFCBF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#E9D8FD',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 28,
  },
  arrowText: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4299E1',
    marginHorizontal: 4,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  mainMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  progressRing: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  progressRingInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderTopColor: '#4299E1',
  },
});

// Cách sử dụng:
//
// // Loading mặc định
// <LoadingModal
//   visible={isLoading}
//   message="Đang xử lý..."
//   subMessage="Vui lòng đợi trong giây lát"
// />
//
// // Upload dữ liệu
// <LoadingModal
//   visible={isLoading}
//   type="upload"
//   message="Đang tải lên..."
//   subMessage="Đang lưu dữ liệu huyết áp"
// />
//
// // Download dữ liệu
// <LoadingModal
//   visible={isLoading}
//   type="download"
//   message="Đang tải xuống..."
//   subMessage="Đang lấy lịch sử đo"
// />
//
// // Đồng bộ
// <LoadingModal
//   visible={isLoading}
//   type="sync"
//   message="Đang đồng bộ..."
//   subMessage="Cập nhật dữ liệu mới nhất"
// />
//
// // Đăng nhập
// <LoadingModal
//   visible={isLoading}
//   type="login"
//   message="Đang đăng nhập..."
//   subMessage="Xác thực tài khoản"
// />

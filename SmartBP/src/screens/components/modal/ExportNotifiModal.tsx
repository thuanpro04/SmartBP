import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { ButtonComponent, RowComponent, TextComponent } from '../layout';
import { appSizes } from '../../../utils/appSizes';
import { appColors } from '../../../utils/appColors';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

const ExportNotifiModal = (props: Props) => {
  const { isVisible, onClose, onConfirm, isLoading = false } = props;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
        <Animated.View
          style={[
            styles.modalBox,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <TextComponent label="📊" style={styles.iconText} />
            </View>
          </View>

          {/* Title */}
          <TextComponent label="Xuất File Excel" style={styles.title} />

          {/* Message */}
          <TextComponent
            label="Bạn có muốn xuất dữ liệu ra file Excel không?"
            style={styles.message}
          />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={onClose}
              style={[styles.button, styles.cancelBtn]}
            >
              <TextComponent label="Không" style={styles.cancelText} />
            </ButtonComponent>

            <ButtonComponent
              onPress={handleConfirm}
              style={[styles.button, styles.confirmBtn]}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <TextComponent label="Có" style={styles.confirmText} />
              )}
            </ButtonComponent>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default ExportNotifiModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalBox: {
    width: '85%',
    maxWidth: 320,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: appSizes.xxLarge,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: appColors.textPrimary || '#1a1a1a',
  },
  message: {
    fontSize: appSizes.medium,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666666',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelBtn: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelText: {
    color: '#666666',
    fontWeight: '600',
    fontSize: appSizes.medium,
  },
  confirmBtn: {
    backgroundColor: appColors.primary || '#007AFF',
    shadowColor: appColors.primary || '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
    fontSize: appSizes.medium,
  },
});

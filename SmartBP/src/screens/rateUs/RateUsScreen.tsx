import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import Entypo from 'react-native-vector-icons/Entypo';
import { appSizes } from '../../utils/appSizes';
import { appColors } from '../../utils/appColors';
const { width } = Dimensions.get('window');

const RateUsScreen = ({ navigation }: any) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingTexts: any = {
    1: 'Rất tệ',
    2: 'Tệ',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Tuyệt vời',
  };

  const handleRatingPress = (rating: any) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn số sao đánh giá');
      return;
    }

    // Xử lý gửi đánh giá (có thể gửi lên server)
    console.log('Rating:', selectedRating);
    console.log('Feedback:', feedback);

    setIsSubmitted(true);

    // Hiển thị thông báo cảm ơn
    Alert.alert(
      'Cảm ơn bạn!',
      'Đánh giá của bạn đã được gửi thành công. Chúng tôi sẽ tiếp tục cải thiện ứng dụng.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Có thể navigate về trang trước hoặc home
            console.log('Navigate back');
          },
        },
      ],
    );
  };

  const handleSkip = () => {
    Alert.alert(
      'Bỏ qua đánh giá',
      'Bạn có chắc chắn muốn bỏ qua việc đánh giá ứng dụng?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Bỏ qua',
          onPress: () => {
            // Navigate back
            console.log('Skip rating');
          },
        },
      ],
    );
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          style={styles.starButton}
          onPress={() => handleRatingPress(i)}
        >
          <Text
            style={[
              styles.star,
              { color: i <= selectedRating ? '#FFD700' : '#E0E0E0' },
            ]}
          >
            ★
          </Text>
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouIcon}>🎉</Text>
          <Text style={styles.thankYouTitle}>Cảm ơn bạn!</Text>
          <Text style={styles.thankYouMessage}>
            Đánh giá của bạn giúp chúng tôi cải thiện ứng dụng tốt hơn
          </Text>
          <TouchableOpacity style={styles.doneButton} onPress={handleSkip}>
            <Text style={styles.doneButtonText}>Hoàn thành</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ContainerComponent>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <RowComponent style={styles.headerRow}>
            <ButtonComponent
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: 'transparent' }}
            >
              <Entypo
                name="chevron-left"
                size={appSizes.iconL}
                color={appColors.cardBg}
              />
            </ButtonComponent>
            <TextComponent
              label="Đánh giá ứng dụng"
              style={styles.headerTitle}
            />
          </RowComponent>
          <TextComponent
            label="Chia sẻ trải nghiệm của bạn với chúng tôi"
            style={styles.headerSubtitle}
          />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* App Icon & Info */}
          <View style={styles.appInfoContainer}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>❤️</Text>
            </View>
            <Text style={styles.appName}>Health Monitor</Text>
            <Text style={styles.appDescription}>
              Ứng dụng theo dõi sức khỏe IoT
            </Text>
          </View>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingTitle}>
              Bạn cảm thấy ứng dụng như thế nào?
            </Text>

            <View style={styles.starsContainer}>{renderStars()}</View>

            {selectedRating > 0 && (
              <Text style={styles.ratingText}>
                {ratingTexts[selectedRating]}
              </Text>
            )}
          </View>

          {/* Feedback Section */}
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>Góp ý của bạn</Text>
            <Text style={styles.feedbackSubtitle}>
              Hãy chia sẻ thêm về trải nghiệm của bạn (không bắt buộc)
            </Text>

            <TextInput
              style={styles.feedbackInput}
              placeholder="Viết góp ý của bạn tại đây..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={feedback}
              onChangeText={setFeedback}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Bỏ qua</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              💡 Đánh giá của bạn giúp chúng tôi cải thiện ứng dụng và mang lại
              trải nghiệm tốt hơn cho mọi người.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default RateUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
   header: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 20,
  },
  headerRow: {
    gap: 0,
  },
  headerTitle: {
    color: appColors.cardBg,
    fontWeight: 'bold',
    fontSize: appSizes.xxLarge,
    flex: 1,
    marginLeft: 22,
  },
  headerSubtitle: {
    fontSize: appSizes.medium,
    color: appColors.cardBg,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appIconText: {
    fontSize: 32,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  ratingSection: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  starButton: {
    padding: 5,
    marginHorizontal: 5,
  },
  star: {
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginTop: 10,
  },
  feedbackSection: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  feedbackSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'transparent',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#fff3cd',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
    textAlign: 'center',
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  thankYouIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  thankYouMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

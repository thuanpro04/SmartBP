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
import { appSizes } from '../../utils/appSizes';
import { appColors } from '../../utils/appColors';
import Entypo from 'react-native-vector-icons/Entypo';
const { width } = Dimensions.get('window');

const FeedBackScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackCategories = [
    { id: 'bug', title: 'Báo lỗi', icon: '🐛', color: '#FF5722' },
    { id: 'feature', title: 'Đề xuất tính năng', icon: '💡', color: '#2196F3' },
    { id: 'improvement', title: 'Cải thiện', icon: '⚡', color: '#FF9800' },
    { id: 'ui', title: 'Giao diện', icon: '🎨', color: '#9C27B0' },
    { id: 'performance', title: 'Hiệu suất', icon: '⚡', color: '#4CAF50' },
    { id: 'other', title: 'Khác', icon: '📝', color: '#607D8B' },
  ];

  const handleCategorySelect = (categoryId: any) => {
    setSelectedCategory(categoryId);
  };

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('Thông báo', 'Vui lòng chọn loại phản hồi');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Thông báo', 'Vui lòng mô tả chi tiết vấn đề');
      return;
    }

    // Xử lý gửi feedback (có thể gửi lên server)
    const feedbackData = {
      category: selectedCategory,
      title: title.trim(),
      description: description.trim(),
      contactInfo: contactInfo.trim(),
      timestamp: new Date().toISOString(),
      deviceInfo: {
        platform: 'mobile',
        version: '1.0.0',
      },
    };

    console.log('Feedback submitted:', feedbackData);

    setIsSubmitted(true);

    Alert.alert(
      'Gửi thành công!',
      'Phản hồi của bạn đã được ghi nhận. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form hoặc navigate back
            resetForm();
          },
        },
      ],
    );
  };

  const resetForm = () => {
    setSelectedCategory('');
    setTitle('');
    setDescription('');
    setContactInfo('');
    setIsSubmitted(false);
  };

  const getSelectedCategoryInfo = () => {
    return feedbackCategories.find(cat => cat.id === selectedCategory);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Cảm ơn phản hồi!</Text>
          <Text style={styles.successMessage}>
            Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và cải
            thiện ứng dụng dựa trên góp ý của bạn.
          </Text>
          <TouchableOpacity
            style={styles.newFeedbackButton}
            onPress={resetForm}
          >
            <Text style={styles.newFeedbackButtonText}>Gửi phản hồi khác</Text>
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
              label="Phản hồi & Góp ý"
              style={styles.headerTitle}
            />
          </RowComponent>
          <TextComponent
            label="Chia sẻ ý kiến để giúp chúng tôi cải thiện ứng dụng"
            style={styles.headerSubtitle}
          />
        </View>
        {/* Content */}
        <View style={styles.content}>
          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Loại phản hồi</Text>
            <Text style={styles.sectionSubtitle}>
              Chọn loại phản hồi phù hợp
            </Text>

            <View style={styles.categoriesContainer}>
              {feedbackCategories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.id && [
                      styles.categoryItemSelected,
                      { borderColor: category.color },
                    ],
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryTitle,
                      selectedCategory === category.id && {
                        color: category.color,
                      },
                    ]}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tiêu đề</Text>
            <Text style={styles.sectionSubtitle}>Mô tả ngắn gọn vấn đề</Text>

            <TextInput
              style={styles.titleInput}
              placeholder="Ví dụ: Ứng dụng bị crash khi đo huyết áp"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={styles.characterCount}>{title.length}/100</Text>
          </View>

          {/* Description Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
            <Text style={styles.sectionSubtitle}>
              Mô tả chi tiết vấn đề, cách tái tạo lỗi, hoặc đề xuất của bạn
            </Text>

            <TextInput
              style={styles.descriptionInput}
              placeholder="Hãy mô tả chi tiết vấn đề bạn gặp phải hoặc đề xuất của bạn..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={styles.characterCount}>{description.length}/500</Text>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
            <Text style={styles.sectionSubtitle}>
              Email hoặc số điện thoại để chúng tôi liên hệ phản hồi (không bắt
              buộc)
            </Text>

            <TextInput
              style={styles.contactInput}
              placeholder="Email hoặc số điện thoại"
              placeholderTextColor="#999"
              value={contactInfo}
              onChangeText={setContactInfo}
              keyboardType="email-address"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              selectedCategory && {
                backgroundColor: getSelectedCategoryInfo()?.color || '#2196F3',
              },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Gửi phản hồi</Text>
          </TouchableOpacity>

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>💡 Mẹo để phản hồi hiệu quả</Text>
            <View style={styles.helpItem}>
              <Text style={styles.helpDot}>•</Text>
              <Text style={styles.helpText}>
                Mô tả chi tiết các bước để tái tạo lỗi
              </Text>
            </View>
            <View style={styles.helpItem}>
              <Text style={styles.helpDot}>•</Text>
              <Text style={styles.helpText}>Đề xuất cách cải thiện cụ thể</Text>
            </View>
            <View style={styles.helpItem}>
              <Text style={styles.helpDot}>•</Text>
              <Text style={styles.helpText}>
                Cung cấp thông tin thiết bị nếu có lỗi
              </Text>
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>📞 Liên hệ trực tiếp</Text>
            <Text style={styles.contactText}>
              Email: support@healthmonitor.com
            </Text>
            <Text style={styles.contactText}>
              Hotline: 1900 1234 (8:00 - 18:00)
            </Text>
          </View>
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default FeedBackScreen;

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
  },
  headerSubtitle: {
    fontSize: appSizes.medium,
    color: appColors.cardBg,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: (width - 60) / 2,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  categoryItemSelected: {
    borderWidth: 2,
    backgroundColor: '#f8f9ff',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  titleInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
  },
  contactInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2196F3',
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
  helpSection: {
    backgroundColor: '#e8f5e8',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  helpDot: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    marginTop: 2,
  },
  helpText: {
    fontSize: 14,
    color: '#2e7d32',
    flex: 1,
    lineHeight: 20,
  },
  contactSection: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e65100',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#e65100',
    marginBottom: 5,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  newFeedbackButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  newFeedbackButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

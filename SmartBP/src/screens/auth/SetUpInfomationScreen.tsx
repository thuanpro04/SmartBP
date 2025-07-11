import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { appColors } from '../../utils/appColors';
import {
    ContainerComponent,
    TextComponent
} from '../components/layout';
const { width, height } = Dimensions.get('window');

const SetUpInfomationScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    medicalHistory: '',
    medications: '',
    smokingStatus: '',
    drinkingStatus: '',
    stressLevel: '',
    sleepHours: '',
    exerciseFrequency: '',
    dietType: '',
    familyHistory: '',
    currentSymptoms: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [slideAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(1));
  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.fullName &&
          formData.age &&
          formData.gender &&
          formData.weight &&
          formData.height
        );
      case 2:
        return (
          formData.activityLevel &&
          formData.exerciseFrequency &&
          formData.sleepHours
        );
      case 3:
        return formData.medicalHistory !== '' && formData.medications !== '';
      case 4:
        return formData.dietType && formData.stressLevel;
      default:
        return false;
    }
  };

  const animateTransition = (callback: any) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: currentStep < totalSteps ? -width : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        animateTransition(() => setCurrentStep(currentStep + 1));
      } else {
        handleSubmit();
      }
    } else {
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin trước khi tiếp tục',
      );
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      animateTransition(() => setCurrentStep(currentStep - 1));
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Thành công! 🎉',
      'Thông tin đã được lưu. AI sẽ sử dụng dữ liệu này để phân tích và đưa ra khuyến nghị cá nhân hóa.',
      [
        {
          text: 'Tuyệt vời!',
          onPress: () => console.log('Data submitted:', formData),
        },
      ],
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressSteps}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View key={index} style={styles.progressStep}>
            <View
              style={[
                styles.progressCircle,
                index + 1 <= currentStep
                  ? styles.progressCircleActive
                  : styles.progressCircleInactive,
              ]}
            >
              {index + 1 < currentStep ? (
                <Icon name="check" size={16} color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.progressNumber,
                    index + 1 <= currentStep
                      ? styles.progressNumberActive
                      : styles.progressNumberInactive,
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            {index < totalSteps - 1 && (
              <View
                style={[
                  styles.progressLine,
                  index + 1 < currentStep
                    ? styles.progressLineActive
                    : styles.progressLineInactive,
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.progressText}>
        Bước {currentStep} / {totalSteps}
      </Text>
    </View>
  );

  const renderInputField = (
    label: string,
    value: string,
    onChangeText: any,
    options: any = {},
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, options.multiline && styles.textArea]}
          value={value}
          onChangeText={onChangeText}
          placeholder={options.placeholder || `Nhập ${label.toLowerCase()}`}
          placeholderTextColor="#999"
          keyboardType={options.keyboardType || 'default'}
          multiline={options.multiline}
          numberOfLines={options.numberOfLines}
        />
        {options.icon && (
          <Icon
            name={options.icon}
            size={20}
            color="#999"
            style={styles.inputIcon}
          />
        )}
      </View>
    </View>
  );

  const renderPickerField = (
    label: any,
    value: any,
    onValueChange: any,
    items: any,
    icon: any,
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Icon name={icon} size={20} color="#666" style={styles.pickerIcon} />
        <Picker
          selectedValue={value}
          style={styles.picker}
          onValueChange={onValueChange}
          dropdownIconColor="#666"
        >
          {items.map((item: any, index: number) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  const renderStep1 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.stepHeader}>
        <LinearGradient
          colors={['#FF8E53', '#FFB400']}
          style={styles.stepIconContainer}
        >
          <Icon name="person" size={32} color="#fff" />
        </LinearGradient>
        <Text style={styles.stepTitle}>Thông tin cơ bản</Text>
        <Text style={styles.stepSubtitle}>Hãy cho chúng tôi biết về bạn</Text>
      </View>

      <View style={styles.formContainer}>
        {renderInputField(
          'Họ và tên *',
          formData.fullName,
          (value: string) => handleInputChange('fullName', value),
          {
            placeholder: 'Nhập họ và tên đầy đủ',
            icon: 'person',
          },
        )}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {renderInputField(
              'Tuổi *',
              formData.age,
              (value: string) => handleInputChange('age', value),
              {
                placeholder: 'Tuổi',
                keyboardType: 'numeric',
                icon: 'cake',
              },
            )}
          </View>
          <View style={styles.halfWidth}>
            {renderPickerField(
              'Giới tính *',
              formData.gender,
              (value: string) => handleInputChange('gender', value),
              [
                { label: 'Chọn giới tính', value: '' },
                { label: '👨 Nam', value: 'male' },
                { label: '👩 Nữ', value: 'female' },
                { label: '🧑 Khác', value: 'other' },
              ],
              'wc',
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {renderInputField(
              'Cân nặng (kg) *',
              formData.weight,
              (value: string) => handleInputChange('weight', value),
              {
                placeholder: 'kg',
                keyboardType: 'numeric',
                icon: 'monitor-weight',
              },
            )}
          </View>
          <View style={styles.halfWidth}>
            {renderInputField(
              'Chiều cao (cm) *',
              formData.height,
              (value: string) => handleInputChange('height', value),
              {
                placeholder: 'cm',
                keyboardType: 'numeric',
                icon: 'height',
              },
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.stepHeader}>
        <LinearGradient
          colors={['#f093fb', '#f5576c']}
          style={styles.stepIconContainer}
        >
          <Icon name="fitness-center" size={32} color="#fff" />
        </LinearGradient>
        <Text style={styles.stepTitle}>Lối sống & Hoạt động</Text>
        <Text style={styles.stepSubtitle}>Thói quen hàng ngày của bạn</Text>
      </View>

      <View style={styles.formContainer}>
        {renderPickerField(
          'Mức độ hoạt động *',
          formData.activityLevel,
          (value: string) => handleInputChange('activityLevel', value),
          [
            { label: 'Chọn mức độ hoạt động', value: '' },
            { label: '😴 Ít vận động', value: 'sedentary' },
            { label: '🚶 Vận động nhẹ', value: 'light' },
            { label: '🏃 Vận động vừa', value: 'moderate' },
            { label: '🏋️ Vận động nhiều', value: 'active' },
            { label: '🔥 Vận động rất nhiều', value: 'very_active' },
          ],
          'directions-run',
        )}

        {renderPickerField(
          'Tần suất tập thể dục *',
          formData.exerciseFrequency,
          (value: string) => handleInputChange('exerciseFrequency', value),
          [
            { label: 'Chọn tần suất', value: '' },
            { label: '❌ Không tập', value: '0' },
            { label: '🔸 1-2 lần/tuần', value: '1-2' },
            { label: '🔶 3-4 lần/tuần', value: '3-4' },
            { label: '🔥 5-6 lần/tuần', value: '5-6' },
            { label: '⭐ Hàng ngày', value: 'daily' },
          ],
          'fitness-center',
        )}

        {renderInputField(
          'Giờ ngủ trung bình *',
          formData.sleepHours,
          (value: string) => handleInputChange('sleepHours', value),
          {
            placeholder: 'Số giờ ngủ/ngày',
            keyboardType: 'numeric',
            icon: 'bedtime',
          },
        )}

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            {renderPickerField(
              'Hút thuốc',
              formData.smokingStatus,
              (value: string) => handleInputChange('smokingStatus', value),
              [
                { label: 'Chọn', value: '' },
                { label: '✅ Không hút', value: 'never' },
                { label: '⏹️ Đã bỏ', value: 'former' },
                { label: '🟡 Thỉnh thoảng', value: 'occasional' },
                { label: '🔴 Thường xuyên', value: 'regular' },
              ],
              'smoking-rooms',
            )}
          </View>
          <View style={styles.halfWidth}>
            {renderPickerField(
              'Uống rượu',
              formData.drinkingStatus,
              (value: string) => handleInputChange('drinkingStatus', value),
              [
                { label: 'Chọn', value: '' },
                { label: '✅ Không uống', value: 'never' },
                { label: '🟡 Thỉnh thoảng', value: 'occasional' },
                { label: '🟠 Vừa phải', value: 'moderate' },
                { label: '🔴 Thường xuyên', value: 'frequent' },
              ],
              'local-bar',
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderStep3 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.stepHeader}>
        <LinearGradient
          colors={['#4facfe', '#00f2fe']}
          style={styles.stepIconContainer}
        >
          <Icon name="medical-services" size={32} color="#fff" />
        </LinearGradient>
        <Text style={styles.stepTitle}>Thông tin y tế</Text>
        <Text style={styles.stepSubtitle}>Tình trạng sức khỏe của bạn</Text>
      </View>

      <View style={styles.formContainer}>
        {renderInputField(
          'Tiền sử bệnh *',
          formData.medicalHistory,
          (value: string) => handleInputChange('medicalHistory', value),
          {
            placeholder:
              'Nhập tiền sử bệnh (cao huyết áp, tiểu đường, tim mạch...) hoặc "Không có"',
            multiline: true,
            numberOfLines: 3,
            icon: 'history',
          },
        )}

        {renderInputField(
          'Thuốc đang sử dụng *',
          formData.medications,
          (value: string) => handleInputChange('medications', value),
          {
            placeholder: 'Nhập các loại thuốc đang sử dụng hoặc "Không có"',
            multiline: true,
            numberOfLines: 3,
            icon: 'medication',
          },
        )}

        {renderInputField(
          'Tiền sử gia đình',
          formData.familyHistory,
          (value: string) => handleInputChange('familyHistory', value),
          {
            placeholder:
              'Tiền sử bệnh trong gia đình (cao huyết áp, tim mạch...) hoặc "Không có"',
            multiline: true,
            numberOfLines: 3,
            icon: 'family-restroom',
          },
        )}

        {renderInputField(
          'Triệu chứng hiện tại',
          formData.currentSymptoms,
          (value: string) => handleInputChange('currentSymptoms', value),
          {
            placeholder:
              'Các triệu chứng đang gặp phải (đau đầu, chóng mặt...) hoặc "Không có"',
            multiline: true,
            numberOfLines: 3,
            icon: 'healing',
          },
        )}
      </View>
    </Animated.View>
  );

  const renderStep4 = () => (
    <Animated.View
      style={[
        styles.stepContainer,
        { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
      ]}
    >
      <View style={styles.stepHeader}>
        <LinearGradient
          colors={['#fa709a', '#fee140']}
          style={styles.stepIconContainer}
        >
          <Icon name="restaurant" size={32} color="#fff" />
        </LinearGradient>
        <Text style={styles.stepTitle}>Dinh dưỡng & Stress</Text>
        <Text style={styles.stepSubtitle}>Hoàn thiện hồ sơ của bạn</Text>
      </View>

      <View style={styles.formContainer}>
        {renderPickerField(
          'Chế độ ăn uống *',
          formData.dietType,
          (value: string) => handleInputChange('dietType', value),
          [
            { label: 'Chọn chế độ ăn', value: '' },
            { label: '🍽️ Ăn bình thường', value: 'normal' },
            { label: '🧂 Ít muối', value: 'low_sodium' },
            { label: '🍯 Ít đường', value: 'low_sugar' },
            { label: '🥑 Ít béo', value: 'low_fat' },
            { label: '🥗 Chế độ DASH', value: 'dash' },
            { label: '🐟 Địa Trung Hải', value: 'mediterranean' },
            { label: '🔄 Chế độ khác', value: 'other' },
          ],
          'restaurant-menu',
        )}

        {renderPickerField(
          'Mức độ stress *',
          formData.stressLevel,
          (value: string) => handleInputChange('stressLevel', value),
          [
            { label: 'Chọn mức độ stress', value: '' },
            { label: '😌 Rất thấp', value: 'very_low' },
            { label: '🙂 Thấp', value: 'low' },
            { label: '😐 Trung bình', value: 'moderate' },
            { label: '😰 Cao', value: 'high' },
            { label: '😵 Rất cao', value: 'very_high' },
          ],
          'psychology',
        )}

        <View style={styles.aiInfoContainer}>
          <LinearGradient colors={['#FF8E53', '#FFB400']} style={styles.aiIcon}>
            <Icon name="smart-toy" size={24} color="#fff" />
          </LinearGradient>
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>AI sẽ giúp bạn</Text>
            <Text style={styles.aiDescription}>
              • Phân tích xu hướng huyết áp{'\n'}• Dự đoán rủi ro sức khỏe{'\n'}
              • Khuyến nghị cá nhân hóa{'\n'}• Cảnh báo sớm khi cần thiết
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.header}>
        <TextComponent label="Thiết lập thông tin" style={styles.headerTitle} />
        <TextComponent
          label="Để AI có thể hỗ trợ bạn tốt nhất"
          style={styles.headerSubtitle}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: appColors.background }}>
        {renderProgressBar()}

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {renderCurrentStep()}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.backButton} onPress={prevStep}>
              <Icon name="arrow-back" size={20} color="#667eea" />
              <TextComponent label="Quay lại" style={styles.backButtonText} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
            <LinearGradient
              colors={
                currentStep === totalSteps
                  ? ['#FF8E53', '#FFB400']
                  : ['#FF8E53', '#FFB400']
              }
              style={styles.nextButtonGradient}
            >
              <TextComponent
                label={currentStep === totalSteps ? 'Hoàn thành' : 'Tiếp tục'}
                style={styles.nextButtonText}
              ></TextComponent>
              <Icon
                name={currentStep === totalSteps ? 'check' : 'arrow-forward'}
                size={20}
                color="#fff"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.primary,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircleActive: {
    backgroundColor: appColors.primary,
  },
  progressCircleInactive: {
    backgroundColor: '#e0e0e0',
  },
  progressNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressNumberActive: {
    color: '#fff',
  },
  progressNumberInactive: {
    color: '#999',
  },
  progressLine: {
    width: 30,
    height: 2,
    marginHorizontal: 5,
  },
  progressLineActive: {
    backgroundColor: appColors.primary,
  },
  progressLineInactive: {
    backgroundColor: '#e0e0e0',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stepIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    paddingRight: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  inputIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerIcon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  aiInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  aiDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#667eea',
    backgroundColor: '#fff',
  },
  backButtonText: {
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    marginLeft: 15,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
    fontSize: 16,
  },
});

export default SetUpInfomationScreen;

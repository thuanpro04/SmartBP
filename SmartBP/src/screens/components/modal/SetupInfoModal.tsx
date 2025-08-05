import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import React, { useEffect, useState } from 'react';
import { ButtonComponent, RowComponent, TextComponent } from '../layout';
import { appColors } from '../../../utils/appColors';
interface Props {
  visible: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}
interface step1 {
  dateOfBirth: Date;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
}
interface step2 {
  cardiovascularDiseases: string[];
  otherConditions: string[];
  currentMedications: string[];
  allergies: string[];
  smokingStatus: string;
}
const SetupInfoModal = (props: Props) => {
  const { onClose, onComplete, visible } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // step1 -info
  const [healthInfo, setHealthInfo] = useState<step1>({
    dateOfBirth: new Date(),
    gender: '',
    height: 0,
    weight: 0,
    bmi: 0,
  });
  // Step 2 - Medical History & Lifestyle
  const [medicalInfo, setMedicalInfo] = useState<step2>({
    cardiovascularDiseases: [],
    otherConditions: [],
    currentMedications: [],
    allergies: [],
    smokingStatus: 'never',
  });
  const [newAllergy, setNewAllergy] = useState('');
  useEffect(() => {
    if (healthInfo.height && healthInfo.weight) {
      const heightInMeters = healthInfo.height / 100;
      const bmi = healthInfo.weight / (heightInMeters * heightInMeters);
      setHealthInfo(prev => ({ ...prev, bmi: Math.round(bmi * 10) / 10 }));
    }
  }, [healthInfo.height, healthInfo.weight]);
  const genderOptions = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'other' },
  ];
  const cardiovascularOptions = [
    { label: 'Tăng huyết áp', value: 'hypertension' },
    { label: 'Bệnh động mạch vành', value: 'coronary_artery_disease' },
    { label: 'Suy tim', value: 'heart_failure' },
    { label: 'Loạn nhịp tim', value: 'arrhythmia' },
    { label: 'Đột quỵ', value: 'stroke' },
    { label: 'Bệnh động mạch ngoại vi', value: 'peripheral_artery_disease' },
  ];

  const otherConditionsOptions = [
    { label: 'Tiểu đường type 1', value: 'diabetes_type1' },
    { label: 'Tiểu đường type 2', value: 'diabetes_type2' },
    { label: 'Bệnh thận', value: 'kidney_disease' },
    { label: 'Ngưng thở khi ngủ', value: 'sleep_apnea' },
    { label: 'Rối loạn tuyến giáp', value: 'thyroid_disorder' },
    { label: 'Béo phì', value: 'obesity' },
  ];

  const medicationTypes = [
    { label: 'Thuốc huyết áp', value: 'bp_med' },
    { label: 'Thuốc tiểu đường', value: 'diabetes_med' },
    { label: 'Thuốc tim', value: 'heart_med' },
    { label: 'Khác', value: 'other' },
  ];

  const smokingOptions = [
    { label: 'Không hút', value: 'never' },
    { label: 'Đã bỏ', value: 'former' },
    { label: 'Còn hút', value: 'current' },
  ];
  const validateStep1 = () => {
    if (!healthInfo.gender || !healthInfo.height || !healthInfo.weight) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return false;
    }
    if (healthInfo.height < 100 || healthInfo.height > 250) {
      Alert.alert('Thông báo', 'Chiều cao phải từ 100-250cm');
      return false;
    }
    if (healthInfo.weight < 30 || healthInfo.weight > 300) {
      Alert.alert('Thông báo', 'Cân nặng phải từ 30-300kg');
      return false;
    }
    return true;
  };
  const handleComplete = () => {
    const completeData = {
      ...healthInfo,
      ...medicalInfo,
    };
    onComplete(completeData);
    onClose();
  };
  const RenderStep1 = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TextComponent label="Thông tin cơ bản" style={styles.stepTitle} />
        {/* Date of Birth */}
        <View style={styles.section}>
          <TextComponent label="Ngày sinh" style={styles.label} />
          <ButtonComponent
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <TextComponent
              style={styles.dateText}
              label={healthInfo.dateOfBirth.toLocaleDateString('vi-VN')}
            />
          </ButtonComponent>
        </View>
        {/* Gender */}
        <View style={styles.section}>
          <TextComponent style={styles.label} label="Giới tính" />
          <RowComponent style={styles.genderRow}>
            {genderOptions.map(option => (
              <ButtonComponent
                style={[
                  styles.genderButton,
                  healthInfo.gender === option.value && styles.selectedGender,
                ]}
                key={option.value}
                onPress={() =>
                  setHealthInfo(prev => ({ ...prev, gender: option.value }))
                }
              >
                <TextComponent
                  style={[
                    styles.genderText,
                    healthInfo.gender === option.value &&
                      styles.selectedGenderText,
                  ]}
                  label={option.label}
                />
              </ButtonComponent>
            ))}
          </RowComponent>
        </View>
        {/* Height & Weight */}
        <RowComponent style={styles.twoColumnSection}>
          <View style={styles.halfSection}>
            <TextComponent style={styles.label} label="Chiều cao (cm)" />
            <TextInput
              style={styles.numberInput}
              value={healthInfo.height.toString()}
              onChangeText={text =>
                setHealthInfo(prev => ({
                  ...prev,
                  height: parseInt(text) || 0,
                }))
              }
              keyboardType="numeric"
              placeholder="160"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.halfSection}>
            <TextComponent style={styles.label} label="Cân nặng (kg)" />
            <TextInput
              style={styles.numberInput}
              value={healthInfo.weight.toString()}
              onChangeText={text =>
                setHealthInfo(prev => ({
                  ...prev,
                  weight: parseInt(text) || 0,
                }))
              }
              keyboardType="numeric"
              placeholder="65"
              placeholderTextColor="#999"
            />
          </View>
        </RowComponent>
        {/* BMI Display */}
        {healthInfo.bmi > 0 && (
          <View style={styles.bmiSection}>
            <TextComponent label="Chỉ số BMI" style={styles.bmiTitle} />
            <View style={styles.bmiCard}>
              <TextComponent
                label={healthInfo.bmi.toString() ?? '0'}
                style={styles.bmiValue}
              />
              <TextComponent
                label={
                  healthInfo.bmi < 18.5
                    ? 'Thiếu cân'
                    : healthInfo.bmi < 25
                    ? 'Bình thường'
                    : healthInfo.bmi < 30
                    ? 'Thừa cân'
                    : 'Béo phì'
                }
                style={styles.bmiStatus}
              />
            </View>
          </View>
        )}
        <DatePicker
          modal
          open={showDatePicker}
          date={healthInfo.dateOfBirth}
          mode="date"
          maximumDate={new Date()}
          onConfirm={date => {
            setShowDatePicker(false);
            setHealthInfo(prev => ({ ...prev, dateOfBirth: date }));
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </ScrollView>
    );
  };
  const RenderStep2 = () => {
    return <ScrollView></ScrollView>;
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        {/* Header */}
        <RowComponent style={styles.header}>
          <ButtonComponent style={styles.closeButton} onPress={onClose}>
            <TextComponent label="Đóng" style={styles.closeText} />
          </ButtonComponent>
          <TextComponent
            label="Thiết lập thông tin"
            style={styles.headerTitle}
          />
          <View style={styles.spacer} />
        </RowComponent>
        {/* Progress */}
        <View style={styles.progressSection}>
          <TextComponent
            label={`Bước ${currentStep}/2`}
            style={styles.progressText}
          />
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentStep / 2) * 100}%` },
              ]}
            />
          </View>
        </View>
        {/* Content */}
        {currentStep === 1 ? <RenderStep1 /> : <RenderStep2 />}
        {/* Footer Buttons */}
        <RowComponent style={styles.footer}>
          {currentStep > 1 && (
            <ButtonComponent
              style={[styles.footerButton, styles.backButton]}
              onPress={() => setCurrentStep(1)}
            >
              <TextComponent label="← Quay lại" style={styles.backText} />
            </ButtonComponent>
          )}
          <ButtonComponent
            style={[styles.footerButton, styles.nextButton]}
            onPress={() => {
              if (currentStep === 1) {
                if (validateStep1()) {
                  setCurrentStep(2);
                }
              } else {
                handleComplete();
              }
            }}
          >
            <TextComponent
              style={styles.nextText}
              label={currentStep === 1 ? 'Tiếp tục →' : '✓ Hoàn thành'}
            />
          </ButtonComponent>
        </RowComponent>
      </View>
    </Modal>
  );
};

export default SetupInfoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.cardBg,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  spacer: {
    width: 50,
  },
  progressSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  dateInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
  },
  genderRow: {
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  genderText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
  },
  selectedGenderText: {
    color: '#fff',
  },
  twoColumnSection: {
    gap: 15,
    marginBottom: 30,
  },
  halfSection: {
    flex: 1,
  },
  numberInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  bmiSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bmiTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  bmiCard: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bmiValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  bmiStatus: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  footerButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#9E9E9E',
  },
  backText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

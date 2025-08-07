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
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/authSlices';
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
  medicalHistory: {
    cardiovascularDiseases: string[]; //Bệnh tim mạch
    otherConditions: string[]; // bệnh khác
    currentMedications: any[]; // Thuốc hiện tại
  };
  lifestyle: {
    smokingStatus: 'never' | 'former' | 'current';
  };
}
const SetupInfoModal = (props: Props) => {
  const { onClose, onComplete, visible } = props;
  const [currentStep, setCurrentStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const profile = useSelector(authSelector);
  // step1 -info
  const [healthInfo, setHealthInfo] = useState<step1>({
    dateOfBirth: new Date(),
    gender: '',
    height: 0,
    weight: 0,
    bmi: 0,
  });
  const [newMedication, setNewMedication] = useState({
    name: '',
    type: '',
    dosage: '',
    frequency: '',
    startDate: new Date(),
  });
  // Step 2 - Medical History & Lifestyle
  const [medicalInfo, setMedicalInfo] = useState<step2>({
    medicalHistory: {
      cardiovascularDiseases: [],
      otherConditions: [],
      currentMedications: [],
    },
    lifestyle: {
      smokingStatus: 'never',
    },
  });
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
      id: profile._id,
    };
    console.log(completeData);
    onComplete(completeData);
    onClose();
  };

  const removeMedication = (index: number) => {
    setMedicalInfo(prev => ({
      ...prev,
      currentMedications: prev.medicalHistory.currentMedications.filter(
        (_, i) => i !== index,
      ),
    }));
  };
  const addMedication = () => {
    if (!newMedication.name.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên thuốc');
      return;
    }
    setMedicalInfo((prev: any) => ({
      ...prev,
      currentMedications: [...prev.currentMedications, { ...newMedication }],
    }));
    setNewMedication({
      name: '',
      type: '',
      dosage: '',
      frequency: '',
      startDate: new Date(),
    });
  };
  const toggleSelection = (
    array: string[],
    value: string,
    field: 'cardiovascularDiseases' | 'otherConditions',
  ) => {
    const newArray = array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];

    setMedicalInfo(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: newArray,
      },
    }));
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
                  height: text === '' ? 0 : parseInt(text),
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
              onChangeText={text => {
                setHealthInfo(prev => ({
                  ...prev,
                  weight: text === '' ? 0 : parseInt(text),
                }));
              }}
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
          date={new Date()}
          mode="date"
          maximumDate={new Date()}
          onConfirm={date => {
            setShowDatePicker(false);
            setHealthInfo(prev => ({
              ...prev,
              dateOfBirth: date,
            }));
          }}
          onCancel={() => setShowDatePicker(false)}
        />
      </ScrollView>
    );
  };

  const RenderStep2 = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TextComponent label="Thông tin sức khỏe" style={styles.stepTitle} />
        <View style={styles.section}>
          <TextComponent label="Trạng thái hút thuốc" style={styles.label} />
          <RowComponent>
            {smokingOptions.map(item => (
              <ButtonComponent
                key={item.value}
                style={[
                  styles.genderButton,
                  medicalInfo.lifestyle.smokingStatus === item.value &&
                    styles.selectedGender,
                ]}
                onPress={() =>
                  setMedicalInfo((prev: any) => ({
                    ...prev,
                    smokingStatus: item.value,
                  }))
                }
              >
                <TextComponent
                  label={item.label}
                  style={[
                    styles.genderText,
                    medicalInfo.lifestyle.smokingStatus === item.value &&
                      styles.selectedGenderText,
                  ]}
                />
              </ButtonComponent>
            ))}
          </RowComponent>
        </View>
        <View style={styles.section}>
          <TextComponent label="Bệnh tim mạch (nếu có)" style={styles.label} />
          <TextComponent
            label="Chọn các bệnh bạn đang mắc phải"
            style={styles.subtitle}
          />
          <View style={styles.checkboxGrid}>
            {cardiovascularOptions.map(option => (
              <ButtonComponent
                key={option.value}
                style={[
                  styles.checkboxItem,
                  medicalInfo.medicalHistory.cardiovascularDiseases.includes(
                    option.value,
                  ) && styles.checkedItem,
                ]}
                onPress={() =>
                  toggleSelection(
                    medicalInfo.medicalHistory.cardiovascularDiseases,
                    option.value,
                    'cardiovascularDiseases',
                  )
                }
              >
                <TextComponent
                  style={[
                    styles.checkboxText,
                    medicalInfo.medicalHistory.cardiovascularDiseases.includes(
                      option.value,
                    ) && styles.checkedText,
                  ]}
                  label={option.label}
                />
              </ButtonComponent>
            ))}
          </View>
        </View>
        {/* Other Conditions */}
        <View style={styles.section}>
          <TextComponent label="Bệnh khác (nếu có)" style={styles.label} />
          <TextComponent
            label="Chọn các bệnh bạn đang mắc phải"
            style={styles.subtitle}
          />
          <View style={styles.checkboxGrid}>
            {otherConditionsOptions.map(option => (
              <ButtonComponent
                key={option.value}
                style={[
                  styles.checkboxItem,
                  medicalInfo.medicalHistory.otherConditions.includes(
                    option.value,
                  ) && styles.checkedItem,
                ]}
                onPress={() =>
                  toggleSelection(
                    medicalInfo.medicalHistory.otherConditions,
                    option.value,
                    'otherConditions',
                  )
                }
              >
                <TextComponent
                  label={option.label}
                  style={[
                    styles.checkboxText,
                    medicalInfo.medicalHistory.otherConditions.includes(
                      option.value,
                    ) && styles.checkedText,
                  ]}
                />
              </ButtonComponent>
            ))}
          </View>
        </View>
        {/* Current Medications */}
        <View style={styles.section}>
          <TextComponent label="Thuốc đang dùng" style={styles.label} />
          <TextComponent
            label="Thêm các loại thuốc bạn đang sử dụng"
            style={styles.subtitle}
          />

          <View style={styles.medicationForm}>
            <TextInput
              style={styles.textInput}
              value={newMedication.name}
              onChangeText={text =>
                setNewMedication(prev => ({ ...prev, name: text }))
              }
              placeholder="Tên thuốc (ví dụ: Amlodipine)"
              placeholderTextColor="#999"
            />

            <View style={styles.medicationTypeRow}>
              <TextComponent label="Loại thuốc:" style={styles.miniLabel} />
              <View style={styles.typeButtons}>
                {medicationTypes.map(type => (
                  <ButtonComponent
                    key={type.value}
                    style={[
                      styles.typeButton,
                      newMedication.type === type.value && styles.selectedType,
                    ]}
                    onPress={() =>
                      setNewMedication(prev => ({ ...prev, type: type.value }))
                    }
                  >
                    <TextComponent
                      label={type.label}
                      style={[
                        styles.typeText,
                        newMedication.type === type.value &&
                          styles.selectedTypeText,
                      ]}
                    ></TextComponent>
                  </ButtonComponent>
                ))}
              </View>
            </View>

            <View style={styles.dosageRow}>
              <TextInput
                style={[styles.textInput, styles.dosageInput]}
                value={newMedication.dosage}
                onChangeText={text =>
                  setNewMedication(prev => ({ ...prev, dosage: text }))
                }
                placeholder="Liều dùng"
                placeholderTextColor="#999"
              />
              <TextInput
                style={[styles.textInput, styles.dosageInput]}
                value={newMedication.frequency}
                onChangeText={text =>
                  setNewMedication(prev => ({ ...prev, frequency: text }))
                }
                placeholder="Tần suất"
                placeholderTextColor="#999"
              />
            </View>

            <ButtonComponent
              style={styles.addMedButton}
              onPress={addMedication}
            >
              <TextComponent
                label="+ Thêm thuốc"
                style={styles.addMedButtonText}
              />
            </ButtonComponent>
          </View>

          {/* Medication List */}
          {medicalInfo.medicalHistory.currentMedications.map((med, index) => (
            <View key={index} style={styles.medicationCard}>
              <View style={styles.medInfo}>
                <TextComponent label={med.name} style={styles.medName} />
                <TextComponent
                  label={`${med.dosage} - ${med.frequency}`}
                  style={styles.medDetails}
                />
              </View>
              <ButtonComponent
                style={styles.removeButton}
                onPress={() => removeMedication(index)}
              >
                <TextComponent label="Xóa" style={styles.removeText} />
              </ButtonComponent>
            </View>
          ))}
        </View>
      </ScrollView>
    );
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
        {currentStep === 1 ? RenderStep1() : RenderStep2()}

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
  checkboxGrid: {
    gap: 12,
  },
  checkboxItem: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  checkedItem: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  checkboxText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  checkedText: {
    color: '#1976D2',
    fontWeight: '500',
  },
  medicationForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  medicationTypeRow: {
    marginBottom: 12,
  },
  miniLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectedType: {
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTypeText: {
    color: '#fff',
  },
  dosageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dosageInput: {
    flex: 1,
    marginBottom: 0,
  },
  addMedButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addMedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  medicationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  medDetails: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
  },
  allergyInputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  allergyInput: {
    flex: 1,
    marginBottom: 0,
  },
  addAllergyButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addAllergyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  allergyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFB74D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  allergyTagText: {
    fontSize: 14,
    color: '#E65100',
    marginRight: 8,
  },
  removeTagButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

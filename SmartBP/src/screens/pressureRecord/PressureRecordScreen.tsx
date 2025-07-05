import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SpacingComponent,
  TextComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';
import { Image } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { appSizes } from '../../utils/appSizes';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Add } from 'iconsax-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { height, width } = Dimensions.get('window');

const PressureRecordScreen = ({ navigation }: any) => {
  const [selectedSystolic, setSelectedSystolic] = useState(120);
  const [selectedDiastolic, setSelectedDiastolic] = useState(80);
  const [selectedPulse, setSelectedPulse] = useState(72);

  const itemHeight = 50;
  const scrollViewHeight = height * 0.15; // Giảm chiều cao để dễ cuộn hơn

  // Handlers cho scroll
  // Hàm xác định trạng thái huyết áp
  const getBloodPressureStatus = () => {
    if (selectedSystolic < 120 && selectedDiastolic < 80) {
      return { status: 'Normal', color: '#22C55E', bgColor: '#DCFCE7' };
    } else if (selectedSystolic < 130 && selectedDiastolic < 80) {
      return { status: 'Elevated', color: '#F59E0B', bgColor: '#FEF3C7' };
    } else if (selectedSystolic < 140 || selectedDiastolic < 90) {
      return { status: 'High Stage 1', color: '#EF4444', bgColor: '#FEE2E2' };
    } else {
      return { status: 'High Stage 2', color: '#DC2626', bgColor: '#FEE2E2' };
    }
  };
  const NumberPicker = ({
    value,
    onChange,
    min,
    max,
    step = 1,
    unit,
    label,
  }: any) => {
    return (
      <View style={styles.numberPickerContainer}>
        <View style={styles.numberPickerHeader}>
          <Text style={styles.numberPickerLabel}>{label}</Text>
          <Text style={styles.numberPickerUnit}>({unit})</Text>
        </View>

        <View style={styles.numberPickerRow}>
          <TouchableOpacity
            onPress={() => onChange(Math.max(min, value - step))}
            style={styles.numberPickerButton}
          >
            <Text style={styles.numberPickerButtonText}>-</Text>
          </TouchableOpacity>

          <View style={styles.numberPickerValue}>
            <Text style={styles.numberPickerValueText}>{value}</Text>
          </View>

          <TouchableOpacity
            onPress={() => onChange(Math.min(max, value + step))}
            style={styles.numberPickerButton}
          >
            <Text style={styles.numberPickerButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const pressureStatus = getBloodPressureStatus();

  return (
    <ContainerComponent>
      <HeaderComponent
        title="Pressure Record"
        text="Cancel"
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        {/* Header với icon và thông tin trạng thái */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="favorite"
              size={40}
              color={appColors.primary}
            />
          </View>

          <View
            style={[
              styles.statusCard,
              { backgroundColor: pressureStatus.bgColor },
            ]}
          >
            <Text style={[styles.statusText, { color: pressureStatus.color }]}>
              {pressureStatus.status}
            </Text>
            <Text style={styles.statusDescription}>
              {selectedSystolic}/{selectedDiastolic} mmHg
            </Text>
          </View>
        </View>

        {/* Measurement Section */}
        <View style={styles.measurementSection}>
          <Text style={styles.sectionTitle}>Current Reading</Text>

          <View style={styles.readingDisplay}>
            <View style={styles.readingCard}>
              <Text style={styles.readingValue}>{selectedSystolic}</Text>
              <Text style={styles.readingLabel}>SYS</Text>
            </View>
            <View style={styles.separator}>
              <Text style={styles.separatorText}>/</Text>
            </View>
            <View style={styles.readingCard}>
              <Text style={styles.readingValue}>{selectedDiastolic}</Text>
              <Text style={styles.readingLabel}>DIA</Text>
            </View>
            <View style={styles.pulseCard}>
              <MaterialIcons
                name="favorite"
                size={16}
                color={appColors.primary}
              />
              <Text style={styles.pulseValue}>{selectedPulse}</Text>
              <Text style={styles.pulseLabel}>BPM</Text>
            </View>
          </View>
        </View>

        {/* Scroll Pickers */}
        {/* Number Pickers */}
        <View style={styles.pickersCard}>
          <Text style={styles.cardTitle}>Adjust Values</Text>

          <View style={styles.pickersContainer}>
            <NumberPicker
              value={selectedSystolic}
              onChange={setSelectedSystolic}
              min={80}
              max={200}
              step={1}
              unit="mmHg"
              label="Systolic"
            />

            <NumberPicker
              value={selectedDiastolic}
              onChange={setSelectedDiastolic}
              min={40}
              max={120}
              step={1}
              unit="mmHg"
              label="Diastolic"
            />

            <NumberPicker
              value={selectedPulse}
              onChange={setSelectedPulse}
              min={40}
              max={200}
              step={1}
              unit="BPM"
              label="Pulse"
            />
          </View>
        </View>
        {/* Date & Time Section */}
        <View style={styles.dateTimeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Date & Time</Text>
            <TouchableOpacity style={styles.noteButton}>
              <Text style={styles.noteText}>Add Note</Text>
              <Add size={16} color={appColors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.dateTimeContainer}>
            <TouchableOpacity style={styles.dateTimeCard}>
              <EvilIcons name="calendar" size={24} color={appColors.primary} />
              <Text style={styles.dateTimeText}>Today, Dec 24</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateTimeCard}>
              <Ionicons
                name="time-outline"
                size={20}
                color={appColors.primary}
              />
              <Text style={styles.dateTimeText}>14:38</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Reading</Text>
        </TouchableOpacity>

        <SpacingComponent height={20} />
      </ScrollView>
    </ContainerComponent>
  );
};

export default PressureRecordScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: appColors.background,
  },

  headerSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: appColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  statusCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },

  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  statusDescription: {
    fontSize: 14,
    color: appColors.textSecondary,
    marginTop: 4,
  },

  measurementSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.title,
    marginBottom: 16,
  },

  readingDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.cardBg,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  readingCard: {
    alignItems: 'center',
  },

  readingValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: appColors.title,
  },

  readingLabel: {
    fontSize: 12,
    color: appColors.textSecondary,
    marginTop: 4,
  },

  separator: {
    marginHorizontal: 20,
  },

  separatorText: {
    fontSize: 32,
    color: appColors.textSecondary,
  },

  pulseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: appColors.background,
    borderRadius: 12,
  },

  pulseValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.title,
    marginLeft: 6,
  },

  pulseLabel: {
    fontSize: 10,
    color: appColors.textSecondary,
    marginLeft: 4,
  },

  pickersSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  pickerCard: {
    flex: 1,
    backgroundColor: appColors.cardBg,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  pickerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: appColors.title,
  },

  pickerUnit: {
    fontSize: 12,
    color: appColors.textSecondary,
    marginBottom: 12,
  },

  pickerWrapper: {
    position: 'relative',
    width: '100%',
  },

  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: appColors.primary,
    zIndex: 1,
    borderRadius: 1,
    marginTop: -1,
  },

  picker: {
    height: height * 0.15,
  },

  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pickerValue: {
    fontSize: 24,
    fontWeight: '600',
    color: appColors.title,
  },

  dateTimeSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  noteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  noteText: {
    fontSize: 14,
    color: appColors.primary,
    fontWeight: '500',
  },

  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  dateTimeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.cardBg,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  dateTimeText: {
    fontSize: 16,
    color: appColors.title,
    fontWeight: '500',
  },

  saveButton: {
    backgroundColor: appColors.primary,
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: appColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  saveButtonText: {
    color: appColors.cardBg,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickersCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal:22
  },
  pickersContainer: {
    gap: 12,
  },
  numberPickerContainer: {
    alignItems: 'center',
  },
  numberPickerHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  numberPickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  numberPickerUnit: {
    fontSize: 12,
    color: '#6B7280',
  },
  numberPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  numberPickerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPickerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  numberPickerValue: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    minWidth: 80,
    alignItems: 'center',
  },
  numberPickerValueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
});

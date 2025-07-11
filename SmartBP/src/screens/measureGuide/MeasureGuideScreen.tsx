import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  TextComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';
import { appSizes } from '../../utils/appSizes';
import { ArrowLeft2 } from 'iconsax-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { LineChart } from 'react-native-chart-kit';
const { width, height } = Dimensions.get('window');
const MeasureGuideScreen = ({ navigation }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurementHistory, setMeasurementHistory] = useState<any[]>([]);
  const [bloodPressure, setBloodPressure] = useState({
    systolic: 0,
    diastolic: 0,
  });
  const [heartRate, setHeartRate] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ['6h', '8h', '10h', '12h', '14h', '16h'],
    datasets: [
      {
        data: [120, 125, 118, 122, 119, 124],
        color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`, // Màu đỏ cho tâm thu
        strokeWidth: 2,
      },
      {
        data: [80, 82, 78, 81, 79, 83],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Màu xanh cho tâm trương
        strokeWidth: 2,
      },
    ],
  });
  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    if (systolic < 120 && diastolic < 80)
      return { text: 'Bình thường', color: '#4CAF50' };
    if (systolic < 130 && diastolic < 80)
      return { text: 'Hơi cao', color: '#FF9800' };
    if (systolic < 140 || diastolic < 90)
      return { text: 'Cao độ 1', color: '#FF5722' };
    return { text: 'Cao độ 2', color: '#F44336' };
  };
  const bpStatus = getBloodPressureStatus(
    bloodPressure.systolic,
    bloodPressure.diastolic,
  );
  const handleConnect = () => {
    setIsConnected(!isConnected);
  };
  const handleMeasure = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const systolic = Math.floor(Math.random() * (140 - 110) + 110);
      const diastolic = Math.floor(Math.random() * (90 - 70) + 70);
      const hr = Math.floor(Math.random() * (100 - 60) + 60);
      setBloodPressure({ systolic, diastolic });
      setHeartRate(hr);
      // Thêm vào lịch sử
      const newMeasurement = {
        id: Date.now(),
        systolic,
        diastolic,
        heartRate: hr,
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMeasurementHistory(prev => [newMeasurement, ...prev.slice(0, 4)]);
      setIsMeasuring(false);
    }, 3000);
  };
  return (
    <ContainerComponent style={styles.container}>
      <ScrollView style={styles.scroll}>
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
              label="Đo Huyết Áp & Nhịp Tim"
              style={styles.headerTitle}
            />
          </RowComponent>
          <TextComponent
            label="Theo dỗi sức khỏe tim mạch"
            style={styles.headerSubtitle}
          />
        </View>
        {/* Trạng thái kết nối */}
        <RowComponent style={styles.connectionCard}>
          <RowComponent>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isConnected ? '#4CAF50' : '#F44336' },
              ]}
            />
            <TextComponent
              style={styles.connectionText}
              label={
                isConnected ? 'Đã kết nối thiết bị' : 'Chưa kết nối thiết bị'
              }
            />
          </RowComponent>
          <ButtonComponent style={styles.connectButton} onPress={handleConnect}>
            <TextComponent
              label={isConnected ? 'Ngắt kết nối' : 'Kết nối'}
              style={styles.connectButtonText}
            />
          </ButtonComponent>
        </RowComponent>
        {/* Thông số hiện tại */}
        <RowComponent style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <TextComponent label="Huyết áp" style={styles.metricLabel} />
            <TextComponent
              label={` ${bloodPressure.systolic}/${bloodPressure.diastolic}`}
              style={styles.metricValue}
            />
            <TextComponent label="mmHg" style={styles.metricUnit} />
            <TextComponent
              label={bpStatus.text}
              style={[styles.metricStatus, { color: bpStatus.color }]}
            />
          </View>
          <View style={styles.metricCard}>
            <TextComponent style={styles.metricLabel} label="Nhịp tim" />
            <TextComponent
              style={styles.metricValue}
              label={heartRate.toString()}
            />
            <TextComponent label="BPM" style={styles.metricUnit} />
            <TextComponent
              label={heartRate > 0 ? 'Bình thường' : 'Chưa đo'}
              style={[
                styles.metricStatus,
                { color: heartRate > 0 ? '#4CAF50' : '#999' },
              ]}
            />
          </View>
        </RowComponent>
        <ButtonComponent
          style={[
            styles.measureButton,
            { opacity: isConnected && !isMeasuring ? 1 : 0.5 },
          ]}
          onPress={handleMeasure}
          disabled={!isConnected || isMeasuring}
        >
          <TextComponent
            label={isMeasuring ? 'Đang đo...' : 'Bắt đầu đo'}
            style={styles.measureButtonText}
          />
        </ButtonComponent>
        {/* Biểu đồ */}
        <View style={styles.chartContainer}>
          <TextComponent
            label="Biểu đồ huyết áp trong ngày"
            style={styles.chartTitle}
          />
          <LineChart
            data={chartData}
            width={width - 40}
            height={220}
            chartConfig={{
              backgroundColor: appColors.cardBg,
              backgroundGradientFrom: appColors.cardBg,
              backgroundGradientTo: appColors.cardBg,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
              },
            }}
            bezier
            style={styles.chart}
          />
          <RowComponent style={styles.chartLegend}>
            <RowComponent style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#F44336' }]}
              />
              <TextComponent style={styles.legendText} label="Tâm thu" />
            </RowComponent>
            <RowComponent style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: '#2196F3' }]}
              />
              <TextComponent label="Tâm trương" style={styles.legendText} />
            </RowComponent>
          </RowComponent>
        </View>
        {/* Lịch sử đo */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Lịch sử đo gần đây</Text>
          {measurementHistory.length > 0 ? (
            measurementHistory.map(item => (
              <RowComponent key={item.id} style={styles.historyItem}>
                <TextComponent
                  label={item.timestamp}
                  style={styles.historyTime}
                />
                <TextComponent
                  label={`${item.systolic}/${item.diastolic} mmHg`}
                  style={styles.historyValue}
                />
                <TextComponent
                  label={`${item.heartRate} BPM`}
                  style={styles.historyHeartRate}
                ></TextComponent>
              </RowComponent>
            ))
          ) : (
            <TextComponent
              label="Chưa có dữ liệu đo"
              style={styles.noHistoryText}
            />
          )}
        </View>
      </ScrollView>
    </ContainerComponent>
  );
};

export default MeasureGuideScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  scroll: {
    flex: 1,
    backgroundColor: appColors.background,
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
    textAlign: 'center',
    fontSize: appSizes.xxLarge,
    flex: 1,
  },
  headerSubtitle: {
    fontSize: appSizes.medium,
    color: appColors.cardBg,
    textAlign: 'center',
    opacity: 0.9,
  },
  connectionCard: {
    backgroundColor: appColors.cardBg,
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  connectionText: {
    fontSize: appSizes.large,
    color: '#333',
  },
  connectButton: {
    backgroundColor: appColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: appColors.cardBg,
    fontSize: appSizes.medium,
    fontWeight: '600',
  },
  metricsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: appColors.cardBg,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingVertical: 6,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  metricUnit: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  measureButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  measureButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  metricStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    backgroundColor: appColors.cardBg,
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  chartLegend: {
    marginTop: 15,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  legendItem: {
    gap: 0,
  },
  historyContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  historyItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyTime: {
    fontSize: 14,
    color: '#666',
    width: 60,
  },
  historyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  historyHeartRate: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  noHistoryText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
    paddingVertical: 20,
  },
});

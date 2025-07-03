import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextComponent from './TextComponent';
import { appColors } from '../../../utils/appColors';
import { appSizes } from '../../../utils/appSizes';
import RowComponent from './RowComponent';
const { width } = Dimensions.get('window');
const CustomDoubleBarChart = ({ data, maxValue = 200 }: any) => {
  const [widthScreen, setWidthScreen] = useState(width);
  const charWidth = width - 64;
  const chartHeight = 200;
  const barWidth = charWidth / data.length / 2.5;
  const barSpacing = 8;
  const groupSpacing = 16;
  const YAxisLabels = () => {
    const labels = [];
    const step = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(step * i);
      const bottom = (chartHeight / 5) * i;
      labels.push(
        <TextComponent
          label={value.toString()}
          key={i}
          style={[styles.yAxisLabel, { bottom: bottom - 8 }]}
        />,
      );
    }
    return labels.reverse();
  };
  const RenderGridLines = () => {
    const lines = [];
    for (let i = 0; i <= 5; i++) {
      const top = (chartHeight / 5) * i;
      lines.push(
        <View
          key={i}
          style={[styles.gridLine, { top: top, width: charWidth - 60 }]}
        />,
      );
    }
    return lines;
  };
  const getBarHeight = (value: any) => {
    return (value / maxValue) * chartHeight;
  };
  useEffect(() => {
    const onChange = ({ window }: { window: any }) => {
      setWidthScreen(window.width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  },[]);
  const RenderBar = () => {
    return data.map((item: any, index: number) => {
      const systolicHeight = getBarHeight(item.systolic);
      const diastolicHeight = getBarHeight(item.diastolic);
      const xPosition = index * (barWidth * 1.5 + barSpacing + groupSpacing);
      return (
        <View
          key={index}
          style={[
            styles.barGroup,
            {
              left: xPosition + 10,
              width: barWidth * 2 + barSpacing,
            },
          ]}
        >
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: systolicHeight,
                  backgroundColor: appColors.systolic || '#E74C3C',
                  width: barWidth - 15,
                },
              ]}
            />
            <TextComponent
              style={[
                styles.barValue,
                { color: appColors.systolic || '#E74C3C' },
              ]}
              label={item.systolic}
            />
          </View>

          {/* Diastolic Bar */}
          <View style={styles.barContainer}>
            <View
              style={[
                styles.bar,
                {
                  height: diastolicHeight,
                  backgroundColor: appColors.diastolic || '#3498DB',
                  width: barWidth - 15,
                },
              ]}
            />
            <Text
              style={[
                styles.barValue,
                { color: appColors.diastolic || '#3498DB' },
              ]}
            >
              {item.diastolic}
            </Text>
          </View>
        </View>
      );
    });
  };
  const RenderXAxisLabels = () => {
    return data.map((item: any, index: number) => {
      const xPosition = index * (barWidth * 2 + barSpacing + groupSpacing);
      return (
        <TextComponent
          key={index}
          style={[
            styles.xAxisLabel,
            {
              width: barWidth * 2 + barSpacing,
            },
          ]}
          label={item.date}
        />
      );
    });
  };
  return (
    <View style={styles.container}>
      <TextComponent style={styles.chartTitle} label="Biểu đồ huyết áp" />
      <RowComponent style={styles.legendContainer}>
        <RowComponent style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: appColors.systolic },
            ]}
          />
          <TextComponent label="Systolic" style={styles.legendText} />
        </RowComponent>
        <RowComponent style={styles.legendItem}>
          <View
            style={[
              styles.legendColor,
              { backgroundColor: appColors.diastolic },
            ]}
          />
          <TextComponent label="Diastolic" style={styles.legendText} />
        </RowComponent>
      </RowComponent>
      <RowComponent style={styles.chartContainer}>
        <View style={styles.yAxisContainer}>
          <YAxisLabels />
        </View>
        <View
          style={[
            styles.charArea,
            { width: charWidth - 60, height: chartHeight },
          ]}
        >
          <RenderGridLines />
          {/* Bars */}
          <View style={styles.barsContainer}>
            <RenderBar />
          </View>
        </View>
      </RowComponent>
      <View
        style={[
          styles.xAxisContainer,
          { width: charWidth - 60, marginLeft: 40 },
        ]}
      >
        <RenderXAxisLabels />
      </View>
    </View>
  );
};

export default CustomDoubleBarChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.cardBg,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: appSizes.xLarge,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  legendContainer: {
    justifyContent: 'center',
    gap: 24,
    marginBottom: 20,
  },
  legendItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: appSizes.medium,
    fontWeight: '600',
    color: '#333',
  },
  chartContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  yAxisContainer: {
    width: 40,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: appSizes.small,
    color: '#666',
    fontWeight: '500',
    position: 'absolute',
    right: 0,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  charArea: {
    position: 'relative',
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  barsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    paddingHorizontal: 16,
  },
  barContainer: {
    alignItems: 'center',
  },
  barGroup: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  bar: {
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  barValue: {
    fontSize: appSizes.tiny,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  xAxisContainer: {
    marginTop: 12,
    position: 'relative',
    flexDirection: 'row',
  },
  xAxisLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#666',
  },
});

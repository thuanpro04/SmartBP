import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { appColors } from '../../utils/appColors';
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
  RowComponent,
  SpacingComponent,
  TextComponent,
} from '../components/layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { appSizes } from '../../utils/appSizes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExportNotifiModal from '../components/modal/ExportNotifiModal';
import { useExcelExport } from '../hook/useExcelExport';
const SettingScreen = ({ navigation }: any) => {
  const [isExportModal, setIsExportModal] = useState(false);
  const { exportData, isExporting } = useExcelExport();
  const onPress = (key: string) => {
    switch (key) {
      case 'language':
        navigation.navigate('language');
        break;
      case 'export':
        onOpenModal();
        break;
      case 'star':
        navigation.navigate('star');
        break;
      case 'feedback':
        navigation.navigate('feedback');
        break;
      default:
        navigation.navigate('share');
        break;
    }
  };
  function onOpenModal() {
    setIsExportModal(true);
  }
  function onCloseModal() {
    setIsExportModal(false);
  }
  const sampleData = [
    { id: 1, name: 'Nguyễn Văn A', age: 25, city: 'Hà Nội' },
    { id: 2, name: 'Trần Thị B', age: 30, city: 'TP.HCM' },
    { id: 3, name: 'Lê Văn C', age: 28, city: 'Đà Nẵng' },
  ];

  const handleExport = async () => {
    const result = await exportData(sampleData, 'danh_sach_nguoi_dung');

    if (result.success) {
      Alert.alert('Thành công', 'Đã xuất file Excel thành công!');
      onCloseModal();
    }
  };
  // Xuất với tùy chỉnh nâng cao
  const handleAdvancedExport = async () => {
    const options = {
      fileName: 'bao_cao_chi_tiet',
      sheetName: 'Danh sách người dùng',
      headers: ['ID', 'Họ tên', 'Tuổi', 'Thành phố'],
      columnWidths: [10, 25, 10, 20],
      advanced: true,
    };

    const result = await exportData(sampleData, 'bao_cao_chi_tiet', options);

    if (result.success) {
      Alert.alert('Thành công', 'Đã xuất file Excel thành công!');
      onCloseModal();
    }
  };
  return (
    <ContainerComponent style={{ paddingBottom: 0 }}>
      <HeaderComponent title="Cài đặt" style={styles.header} />
      <View style={styles.main}>
        <View style={styles.card}>
          <ButtonComponent
            onPress={() => onPress('language')}
            style={styles.btnCard}
          >
            <RowComponent style={styles.row}>
              <FontAwesome
                name="language"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Ngôn ngữ" />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent
            onPress={() => onPress('export')}
            style={styles.btnCard}
          >
            <RowComponent style={styles.row}>
              <Fontisto
                name="export"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Xuất file excel" />
            </RowComponent>
          </ButtonComponent>
        </View>

        <View style={styles.card}>
          <ButtonComponent
            onPress={() => onPress('star')}
            style={styles.btnCard}
          >
            <RowComponent style={styles.row}>
              <FontAwesome
                name="star"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Đánh giá" />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent
            onPress={() => onPress('share')}
            style={styles.btnCard}
          >
            <RowComponent style={styles.row}>
              <Fontisto
                name="share"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Chia sẽ với mọi người" />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent
            onPress={() => onPress('feedback')}
            style={styles.btnCard}
          >
            <RowComponent style={styles.row}>
              <MaterialIcons
                name="feedback"
                size={appSizes.iconM}
                color={appColors.primary}
              />
              <TextComponent label="Phản hồi" />
            </RowComponent>
          </ButtonComponent>
        </View>
      </View>
      <ExportNotifiModal
        isVisible={isExportModal}
        onClose={onCloseModal}
        onConfirm={handleExport}
        isLoading={isExporting}
      />
    </ContainerComponent>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  main: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  card: {
    padding: 16,
    backgroundColor: appColors.cardBg,
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  row: {
    justifyContent: 'flex-start',
    paddingVertical: 12,
  },
  btnCard: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
  },
  btn: {},
});

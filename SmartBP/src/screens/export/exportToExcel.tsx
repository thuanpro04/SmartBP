import { StyleSheet, Text, View } from 'react-native';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform, Alert } from 'react-native';
export const exportToExcel = async (data: any, fileName = 'export') => {
  try {
    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // Tạo file excel
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;
    await RNFS.writeFile(filePath, wbout, 'ascii');
    const shareOptions = {
      title: 'Xuất file Excel',
      url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: `${fileName}.xlsx`,
    };
    await Share.open(shareOptions);
    return { success: true, filePath };
  } catch (error: any) {
    console.log('Lỗi xuất Excel:', error);
    Alert.alert('Lỗi', 'Không thể xuất file Excel');
    return { success: false, error: error.message };
  }
};

// Hàm xuất với tùy chỉnh nâng cao
export const exportToExcelAdvanced = async (data: any, options: any = {}) => {
  try {
    const {
      fileName = 'export',
      sheetName = 'Sheet1',
      headers = null,
      columnWidths = null,
      formatting = null,
    } = options;

    // Tạo worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Tùy chỉnh headers nếu có
    if (headers) {
      XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
    }

    // Tùy chỉnh độ rộng cột
    if (columnWidths) {
      ws['!cols'] = columnWidths.map((width: any) => ({ width }));
    }

    // Tạo workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Xuất file
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;

    await RNFS.writeFile(filePath, wbout, 'ascii');

    const shareOptions = {
      title: 'Xuất file Excel',
      url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      filename: `${fileName}.xlsx`,
    };

    await Share.open(shareOptions);

    return { success: true, filePath };
  } catch (error: any) {
    console.error('Lỗi xuất Excel:', error);
    Alert.alert('Lỗi', 'Không thể xuất file Excel');
    return { success: false, error: error.message };
  }
};

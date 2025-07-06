import { useState } from 'react';
import { exportToExcel, exportToExcelAdvanced } from '../export/exportToExcel';

export const useExcelExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportData = async (data:any, fileName:any, options:any = {}) => {
    setIsExporting(true);
    
    try {
      const result = options.advanced 
        ? await exportToExcelAdvanced(data, options)
        : await exportToExcel(data, fileName);
      
      return result;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportData,
    isExporting
  };
};
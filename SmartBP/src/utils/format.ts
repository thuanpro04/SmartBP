const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};
const formatFullDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const formated = date.toLocaleString('vi-VN');
  return formated;
};
const getBloodPressureStatus = (systolic: number, diastolic: number) => {
  if (systolic < 120 && diastolic < 80)
    return { text: 'Bình thường', color: '#4CAF50' };
  if (systolic < 130 && diastolic < 80)
    return { text: 'Hơi cao', color: '#FF9800' };
  if (systolic < 140 || diastolic < 90)
    return { text: 'Cao độ 1', color: '#FF5722' };
  return { text: 'Cao độ 2', color: '#F44336' };
};
export { formatDate, getBloodPressureStatus, formatFullDate };

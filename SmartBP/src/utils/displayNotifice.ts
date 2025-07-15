import Toast from "react-native-toast-message";

const activity = (
  type: 'success' | 'error' | 'info',
  text1: string,
  text2: string,
) => {
  Toast.show({
    type,
    text1,
    text2,
    position: 'top',
    visibilityTime: 3000,
  });
};

export const displayNotification = {
  activity,
};

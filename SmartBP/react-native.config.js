module.exports = {
  project: {
    android: {
      packageName: 'com.smartbp', // Đảm bảo đúng với cấu hình Android
    },
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
  assets: ['../SmartBP/src/assets/fonts/'],
};

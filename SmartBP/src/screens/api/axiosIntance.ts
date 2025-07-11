import axios from 'axios';
import { BASE_URL } from './apiPath';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axiosIntance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
axiosIntance.interceptors.request.use(
  async config => {
    const userData = await AsyncStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    const accesstoken = user?.accessToken;
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
axiosIntance.interceptors.response.use(
  respons => {
    return respons;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Unauthorized! Redirecting to login ...');
      } else if (error.response.status === 500) {
        console.log('Server error, Please try again later');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.log('Request timeout. Please try again');
    }
    return Promise.reject(error);
  },
);
export default axiosIntance;

import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from '../SplashScreen';
import MainNavigation from '../navigation/MainNavigation';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/slices/authSlices';
import AuthNavigation from '../navigation/AuthNavigation';
const AppRouter = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const { getItem, setItem } = useAsyncStorage('user');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const checkLogin = async () => {
    const data: any = await getItem();
    const user = JSON.parse(data);
    dispatch(addAuth(user));
  };
  useEffect(() => {
    checkLogin();
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accessToken ? (
        <AuthNavigation />
      ) : (
        <MainNavigation />
      )}
    </>
  );
};

export default AppRouter;

const styles = StyleSheet.create({});

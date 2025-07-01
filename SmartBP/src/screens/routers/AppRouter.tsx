import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from '../SplashScreen';
import MainNavigation from '../navigation/MainNavigation';

const AppRouter = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return <>{isShowSplash ? <SplashScreen /> : <MainNavigation />}</>;
};

export default AppRouter;

const styles = StyleSheet.create({});

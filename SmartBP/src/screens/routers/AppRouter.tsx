import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import SplashScreen from '../SplashScreen';
import HomeScreen from '../home/HomeScreen';
import MainNavigation from '../navigation/MainNavigation';

const AppRouter = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return <>{isShowSplash ? <SplashScreen /> : <MainNavigation />}</>;
};

export default AppRouter;

const styles = StyleSheet.create({});

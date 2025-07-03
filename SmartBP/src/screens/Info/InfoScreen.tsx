import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CardInfoComponent,
  ContainerComponent,
  HeaderComponent,
} from '../components/layout';
import { appColors } from '../../utils/appColors';

const InfoScreen = () => {
  const [isLangscape, setIsLangscape] = useState(false);
  useEffect(() => {
    const onChangeScreen = (result: any) => {
      setIsLangscape(result.window.width > result.window.height);
    };
    const subscription = Dimensions.addEventListener('change', onChangeScreen);
    return () => subscription.remove();
  }, []);
  return (
    <ContainerComponent style={styles.container}>
      <View style={styles.main}>
        <HeaderComponent
          title="Info & Knowledge"
          style={styles.headerContainer}
        />
        {!isLangscape && (
          <Image
            style={styles.imgBanner}
            source={{
              uri: 'https://d1xvb4xaszdwk1.cloudfront.net/5eb0affe-1991-449b-bfc0-a5a0516548bf/8906c4c8-7f6f-47c0-bdff-1181b4f12352/8906c4c8-7f6f-47c0-bdff-1181b4f12352_webp_automated_rendition__c.webp',
            }}
          />
        )}
        <CardInfoComponent />
      </View>
    </ContainerComponent>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  main: {
    backgroundColor: appColors.background,
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    borderBottomColor: appColors.border,
    borderBottomWidth: 1,
  },
  imgBanner: {
    height: '30%',
    width: '90%',
    borderRadius: 20,
    marginTop: 22,
  },
});

import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { menuInfo } from '../../data/data';
import RowComponent from './RowComponent';
import { Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { appSizes } from '../../../utils/appSizes';
import ButtonComponent from './ButtonComponent';
import { appColors } from '../../../utils/appColors';
import TextComponent from './TextComponent';

const CardInfoComponent = () => {
  const renderItems = ({ item, index }: any) => {
    return (
      <View
        style={[styles.cardContainer, { backgroundColor: item.background }]}
      >
        <View style={{ zIndex: 10 }}>
          <View style={styles.btnContainer}>
            <ButtonComponent
              style={[styles.btnRight]}
              onPress={() => console.log('hello')}
            >
              <Entypo
                name="chevron-right"
                size={appSizes.iconS}
                color={item.background}
              />
            </ButtonComponent>
          </View>
          <Image source={item.icon} style={styles.image} />

          <TextComponent
            label={item.title}
            style={styles.title}
            numberOfLine={2}
          />
        </View>
        <Image
          source={item.uriBackground}
          style={{
            width: (140 * (index + 10)) / 10,
            height: (140 * (index + 10)) / 10,
            position: 'absolute',
            right: 0,
            bottom: -50,
            opacity: 0.2,
            zIndex: -1,
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {
        <FlatList
          style={{ flex: 1 }}
          numColumns={2}
          data={menuInfo}
          keyExtractor={item => item.id}
          renderItem={renderItems}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      }
    </View>
  );
};

export default CardInfoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: -22,
  },
  cardContainer: {
    padding: 16,
    width: '49%',
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: 12,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.2,
    shadowRadius:12,
    elevation:2
  },
  btnRight: {
    backgroundColor: appColors.cardBg,
    borderRadius: 50,
    alignItems: 'center',
    width: 35,
    height: 35,
    justifyContent: 'center',
  },
  title: {
    color: appColors.cardBg,
    fontSize: appSizes.medium + 1,
    paddingTop: 12,
  },
  btnContainer: { alignItems: 'flex-end' },
});

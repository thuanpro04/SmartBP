import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { appColors } from '../../../utils/appColors';
import { ButtonComponent, RowComponent, TextComponent } from '../layout';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { appSizes } from '../../../utils/appSizes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const { width, height } = Dimensions.get('window');
interface Props {
  isVisible: boolean;
  onClose: () => void;
  navigation: any;
}

const AddModal = (props: Props) => {
  const { isVisible, onClose, navigation } = props;
  const modalRef = useRef<Modalize>(null);
  useEffect(() => {
    if (isVisible) {
      openModal();
    }
  }, [isVisible]);
  const openModal = () => {
    modalRef.current?.open();
  };
  const handleClose = () => {
    modalRef.current?.close();
    onClose();
  };
  const onNavigationRecord = () => {
    handleClose();
    navigation.navigate('record');
  };
  const onNavigationHeartRate = () => {
    handleClose();
    navigation.navigate('record');
  };
  return (
    <Portal>
      <Modalize
        ref={modalRef}
        onClose={onClose}
        modalHeight={height * 0.32}
        modalStyle={{ flex: 1 }}
      >
        <View style={styles.content}>
          <RowComponent style={styles.header}>
            <TextComponent label="Add Result" style={styles.title} />
            <ButtonComponent onPress={handleClose}>
              <AntDesign
                name="close"
                color={appColors.iconDefault}
                size={appSizes.iconS}
              />
            </ButtonComponent>
          </RowComponent>
          <ButtonComponent
            onPress={onNavigationRecord}
            style={[styles.btn, { backgroundColor: appColors.primary }]}
          >
            <RowComponent style={{}}>
              <FontAwesome5
                name="heartbeat"
                color={appColors.cardBg}
                size={appSizes.iconS}
              />
              <TextComponent
                label="Blood Pressure"
                style={[styles.label, { color: appColors.cardBg }]}
              />
            </RowComponent>
          </ButtonComponent>
          <ButtonComponent
            onPress={() => {}}
            style={[
              styles.btn,
              {
                backgroundColor: appColors.cardBg,
                borderWidth: 1,
                borderColor: appColors.textSecondary,
              },
            ]}
          >
            <RowComponent style={{}}>
              <FontAwesome5
                name="fingerprint"
                color={appColors.pulse}
                size={appSizes.iconS}
              />
              <TextComponent
                label="Heart Rate Pressure"
                style={[styles.label, { color: appColors.primary }]}
              />
            </RowComponent>
          </ButtonComponent>
        </View>
      </Modalize>
    </Portal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  container: {},
  content: {
    padding: 20,
    flex: 1,
  },
  header: {
    paddingBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: appSizes.xxxLarge,
  },
  btn: {
    borderRadius: 50,
    paddingHorizontal: 26,
    paddingVertical: 12,
    marginBottom: 22,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
  },
});

import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ButtonComponent, RowComponent, TextComponent } from '../layout';
import { appColors } from '../../../utils/appColors';
import { appSizes } from '../../../utils/appSizes';
import { availableTags } from '../../data/data';
interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selectedTags: string[]) => void;
}
interface tags {
  key: string;
  label: string;
  color: string;
}
const TagsSelectionModal = (props: Props) => {
  const { onClose, onConfirm, visible } = props;
  const [selectedTags, setSelectedTags] = useState<any>([]);

  const toggleTag = (tagKey: string) => {
    setSelectedTags((prev: any) =>
      prev.includes(tagKey)
        ? prev.filter((tag: any) => tag !== tagKey)
        : [...prev, tagKey],
    );
  };
  const handleConfirm = () => {
    if (selectedTags.length === 0) {
      Alert.alert('Vui lòng chọn ít nhất 1 tag để mô tả trạng thái của bạn');
      return;
    }
    onConfirm(selectedTags);
    setSelectedTags([]);
    onClose();
  };
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TextComponent
            label="Trạng thái khi đo huyết áp"
            style={styles.modalTitle}
          />
          <TextComponent
            label="Chọn các yếu tố ảnh hướng đến kết quả đo"
            style={styles.modalSubtitle}
          />
          <ScrollView style={styles.tagsContainer}>
            <View style={styles.tagsGrid}>
              {availableTags.map(tag => (
                <TouchableOpacity
                  key={tag.key}
                  style={[
                    styles.tagButton,
                    { borderColor: tag.color },
                    selectedTags.includes(tag.key) && {
                      backgroundColor: tag.color,
                    },
                  ]}
                  onPress={() => toggleTag(tag.key)}
                >
                  <TextComponent
                    label={tag.label}
                    style={[
                      styles.tagText,
                      selectedTags.includes(tag.key) && styles.selectedTagText,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <RowComponent style={styles.modalButtons}>
            <ButtonComponent onPress={onClose} style={styles.cancelButton}>
              <TextComponent label="Hủy" style={styles.cancelButtonText} />
            </ButtonComponent>

            <ButtonComponent
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <TextComponent
                label="Xác nhận"
                style={styles.confirmButtonText}
              />
            </ButtonComponent>
          </RowComponent>
        </View>
      </View>
    </Modal>
  );
};

export default TagsSelectionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  tagsContainer: {
    maxHeight: 300,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tagButton: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  selectedTagText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalButtons: {
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    color: '#666',
    fontWeight: '600',
    fontSize: appSizes.large,
  },
  confirmButton: {
    backgroundColor: '#2196f3',
    borderRadius: 25,
    flex: 1,
    paddingVertical: 12,
  },
  confirmButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: appSizes.large,
  },
});

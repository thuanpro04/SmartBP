import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import {
  ButtonComponent,
  ContainerComponent,
  HeaderComponent,
} from '../components/layout'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { appSizes } from '../../utils/appSizes'
import { appColors } from '../../utils/appColors'

const LanguageScreen = ({ navigation }: any) => {
  const [selectedLanguage, setSelectedLanguage] = useState('vi') // Default Vietnamese

  const languages = [
    {
      code: 'vi',
      name: 'Tiếng Việt',
      nativeName: 'Tiếng Việt',
      flag: '🇻🇳',
      isPopular: true,
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      isPopular: true,
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      isPopular: true,
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      isPopular: true,
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      isPopular: true,
    },
    {
      code: 'th',
      name: 'Thai',
      nativeName: 'ภาษาไทย',
      flag: '🇹🇭',
      isPopular: true,
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      isPopular: false,
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      isPopular: false,
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isPopular: false,
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      isPopular: false,
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      isPopular: false,
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      isPopular: false,
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      isPopular: false,
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      isPopular: false,
    },
  ]

  const popularLanguages = languages.filter(lang => lang.isPopular)
  const otherLanguages = languages.filter(lang => !lang.isPopular)

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode)
  }

  const handleSaveLanguage = () => {
    const selectedLang = languages.find(lang => lang.code === selectedLanguage)
    Alert.alert(
      'Thay đổi ngôn ngữ',
      `Bạn đã chọn ${selectedLang?.name}. Ứng dụng sẽ khởi động lại để áp dụng thay đổi.`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            // Here you would typically save to AsyncStorage and restart app
            console.log('Language changed to:', selectedLanguage)
            navigation.goBack()
          },
        },
      ]
    )
  }

  const LanguageItem = ({ language, isSelected, onPress }:any) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        isSelected && styles.selectedLanguageItem,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.languageInfo}>
        <Text style={styles.flag}>{language.flag}</Text>
        <View style={styles.languageNames}>
          <Text style={[
            styles.languageName,
            isSelected && styles.selectedLanguageName,
          ]}>
            {language.name}
          </Text>
          <Text style={[
            styles.nativeName,
            isSelected && styles.selectedNativeName,
          ]}>
            {language.nativeName}
          </Text>
        </View>
      </View>
      <View style={styles.radioContainer}>
        <View style={[
          styles.radioButton,
          isSelected && styles.selectedRadioButton,
        ]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <ContainerComponent>
      <HeaderComponent
        style={styles.header}
        icon={
          <ButtonComponent
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'transparent' }}
          >
            <Entypo
              name="chevron-left"
              size={appSizes.iconL}
              color={appColors.primary}
            />
          </ButtonComponent>
        }
        title="Chọn ngôn ngữ"
      />
      
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Current Language Display */}
          <View style={styles.currentLanguageSection}>
            <View style={styles.currentLanguageCard}>
              <MaterialIcons 
                name="language" 
                size={24} 
                color={appColors.primary} 
              />
              <View style={styles.currentLanguageInfo}>
                <Text style={styles.currentLanguageLabel}>Ngôn ngữ hiện tại</Text>
                <Text style={styles.currentLanguageName}>
                  {languages.find(lang => lang.code === selectedLanguage)?.name}
                </Text>
              </View>
            </View>
          </View>

          {/* Popular Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ngôn ngữ phổ biến</Text>
            <View style={styles.languageList}>
              {popularLanguages.map((language) => (
                <LanguageItem
                  key={language.code}
                  language={language}
                  isSelected={selectedLanguage === language.code}
                  onPress={() => handleLanguageSelect(language.code)}
                />
              ))}
            </View>
          </View>

          {/* Other Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ngôn ngữ khác</Text>
            <View style={styles.languageList}>
              {otherLanguages.map((language) => (
                <LanguageItem
                  key={language.code}
                  language={language}
                  isSelected={selectedLanguage === language.code}
                  onPress={() => handleLanguageSelect(language.code)}
                />
              ))}
            </View>
          </View>

          {/* Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <MaterialIcons 
                name="info-outline" 
                size={20} 
                color={appColors.textSecondary} 
              />
              <Text style={styles.infoText}>
                Thay đổi ngôn ngữ sẽ áp dụng cho toàn bộ ứng dụng. 
                Ứng dụng sẽ khởi động lại để áp dụng thay đổi.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <ButtonComponent
          style={styles.saveButton}
          onPress={handleSaveLanguage}
        >
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </ButtonComponent>
      </View>
    </ContainerComponent>
  )
}

export default LanguageScreen

const styles = StyleSheet.create({
  header: {
    gap: 0,
    paddingHorizontal: 0,
    borderBottomColor: appColors.border,
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
    backgroundColor: appColors.cardBg,
  },
  content: {
    padding: 16,
  },
  currentLanguageSection: {
    marginBottom: 24,
  },
  currentLanguageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  currentLanguageInfo: {
    marginLeft: 12,
  },
  currentLanguageLabel: {
    fontSize: 12,
    color: appColors.textSecondary,
    marginBottom: 4,
  },
  currentLanguageName: {
    fontSize: 16,
    fontWeight: '600',
    color: appColors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: appColors.textPrimary,
    marginBottom: 16,
  },
  languageList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.border,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: appColors.border,
  },
  selectedLanguageItem: {
    backgroundColor: '#F0F8FF',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageNames: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.textPrimary,
    marginBottom: 2,
  },
  selectedLanguageName: {
    color: appColors.primary,
    fontWeight: '600',
  },
  nativeName: {
    fontSize: 14,
    color: appColors.textSecondary,
  },
  selectedNativeName: {
    color: appColors.primary,
  },
  radioContainer: {
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: appColors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: appColors.primary,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.border,
  },
  infoText: {
    fontSize: 14,
    color: appColors.textSecondary,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: appColors.border,
  },
  saveButton: {
    backgroundColor: appColors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})
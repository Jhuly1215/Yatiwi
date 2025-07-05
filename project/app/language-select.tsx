import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸', greeting: 'Selecciona tu idioma' },
  { code: 'ay', name: 'Aymara', flag: '🇦🇲', greeting: 'Aru ajlliña' },
  { code: 'qu', name: 'Quechua', flag: '🇶🇪', greeting: 'Rimaykita akllawiy' },
];

export default function LanguageSelect() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setLanguage(langCode);
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Yatiqaña</Text>
        <Text style={styles.subtitle}>
          {languages.find(lang => lang.code === selectedLanguage)?.greeting}
        </Text>
      </View>

      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageButton,
              selectedLanguage === language.code && styles.selectedLanguageButton
            ]}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <Text style={[
              styles.languageName,
              selectedLanguage === language.code && styles.selectedLanguageName
            ]}>
              {language.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Educación para todos los niños de Bolivia
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  languageContainer: {
    gap: 16,
    marginBottom: 48,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedLanguageButton: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  selectedLanguageName: {
    color: colors.primary,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';
import { Settings, Globe, Download, CircleHelp as HelpCircle, User, Shield, Volume2, Eye, Wifi, Smartphone, LogOut } from 'lucide-react-native';

const translations = {
  es: {
    title: 'Ajustes',
    profile: 'Perfil',
    language: 'Idioma',
    offlineContent: 'Contenido Offline',
    audioSettings: 'Configuración de Audio',
    accessibility: 'Accesibilidad',
    help: 'Ayuda y Soporte',
    about: 'Acerca de',
    logout: 'Cerrar Sesión',
    currentLanguage: 'Idioma Actual',
    downloadedContent: 'Contenido Descargado',
    syncContent: 'Sincronizar Contenido',
    voiceSpeed: 'Velocidad de Voz',
    textSize: 'Tamaño de Texto',
    highContrast: 'Alto Contraste',
    tutorials: 'Tutoriales',
    contact: 'Contactar Soporte',
    version: 'Versión',
    offlineMode: 'Modo Offline',
    connected: 'Conectado',
    offline: 'Sin Conexión',
    storage: 'Almacenamiento',
    usedSpace: 'Espacio Usado',
    spanish: 'Español',
    aymara: 'Aymara',
    quechua: 'Quechua',
    normal: 'Normal',
    slow: 'Lento',
    fast: 'Rápido',
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    enabled: 'Activado',
    disabled: 'Desactivado',
    gb: 'GB',
    mb: 'MB',
  },
  ay: {
    title: 'Wakichawi',
    profile: 'Perfil',
    language: 'Aru',
    offlineContent: 'Jan Internet Yatiqawinaka',
    audioSettings: 'Ist\'añ Wakichawi',
    accessibility: 'Puriñ Wakichawi',
    help: 'Yanapaña ukat Yanapt\'iri',
    about: 'Ukat Wakichawi',
    logout: 'Mistusi',
    currentLanguage: 'Jichhak Aru',
    downloadedContent: 'Apaqat Yatiqawinaka',
    syncContent: 'Yatiqawinaka Mayachawi',
    voiceSpeed: 'Arut Velocity',
    textSize: 'Qillqat Jach\'a',
    highContrast: 'Jach\'a Contraste',
    tutorials: 'Yatichañ Thakhi',
    contact: 'Yanapt\'iri Jikxataña',
    version: 'Versión',
    offlineMode: 'Jan Internet',
    connected: 'Mayachitta',
    offline: 'Jan Mayachawi',
    storage: 'Imañ Utayawi',
    usedSpace: 'Apnaqat Utayawi',
    spanish: 'Español',
    aymara: 'Aymara',
    quechua: 'Quechua',
    normal: 'Comun',
    slow: 'K\'iphata',
    fast: 'Jank\'aki',
    small: 'Jisk\'a',
    medium: 'Taypi',
    large: 'Jach\'a',
    enabled: 'Luriri',
    disabled: 'Jan Luriri',
    gb: 'GB',
    mb: 'MB',
  },
  qu: {
    title: 'Wakichayninchik',
    profile: 'Perfil',
    language: 'Rimay',
    offlineContent: 'Mana Internet Yachaykunaq',
    audioSettings: 'Uyariy Wakichay',
    accessibility: 'Purinapaq Wakichay',
    help: 'Yanapay Yanapt\'iri',
    about: 'Kaypi Wakichay',
    logout: 'Lluqsiy',
    currentLanguage: 'Kunaq Rimay',
    downloadedContent: 'Apasqa Yachaykunaq',
    syncContent: 'Yachaykunaq Huñuy',
    voiceSpeed: 'Rimay Utqaylla',
    textSize: 'Qillqay Hatun',
    highContrast: 'Hatun Contraste',
    tutorials: 'Yachachiy Ñan',
    contact: 'Yanapt\'iri Maskay',
    version: 'Versión',
    offlineMode: 'Mana Internet',
    connected: 'Huñusqa',
    offline: 'Mana Huñuy',
    storage: 'Waqaychana',
    usedSpace: 'Llamk\'achisqa',
    spanish: 'Español',
    aymara: 'Aymara',
    quechua: 'Quechua',
    normal: 'Comun',
    slow: 'Pisi',
    fast: 'Utqaylla',
    small: 'Uchuy',
    medium: 'Chawpi',
    large: 'Hatun',
    enabled: 'Rurasqa',
    disabled: 'Mana Rurasqa',
    gb: 'GB',
    mb: 'MB',
  },
};

export default function SettingsScreen() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [isOffline, setIsOffline] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState('normal');
  const [textSize, setTextSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  const t = translations[language as keyof typeof translations] || translations.es;

  const handleLogout = () => {
    Alert.alert(
      t.logout,
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => router.replace('/auth') },
      ]
    );
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightComponent,
    showArrow = true 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent && (
        <View style={styles.settingRight}>
          {rightComponent}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.title}</Text>
      </View>

      {/* Connection Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusIndicator}>
          <Wifi size={20} color={isOffline ? colors.textSecondary : colors.success} />
          <Text style={[styles.statusText, { color: isOffline ? colors.textSecondary : colors.success }]}>
            {isOffline ? t.offline : t.connected}
          </Text>
        </View>
        <Text style={styles.statusSubtitle}>
          {isOffline ? t.offlineMode : 'Última sincronización: hace 2 horas'}
        </Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <SettingItem
          icon={<User size={24} color={colors.primary} />}
          title={t.profile}
          subtitle="María Condori"
          onPress={() => {}}
        />
      </View>

      {/* Language & Content */}
      <View style={styles.section}>
        <SettingItem
          icon={<Globe size={24} color={colors.primary} />}
          title={t.language}
          subtitle={`${t.currentLanguage}: ${t[language as keyof typeof t]}`}
          onPress={() => {}}
          rightComponent={
            <View style={styles.languageButtons}>
              {['es', 'ay', 'qu'].map(lang => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageButton,
                    language === lang && styles.selectedLanguageButton
                  ]}
                  onPress={() => handleLanguageChange(lang)}
                >
                  <Text style={[
                    styles.languageButtonText,
                    language === lang && styles.selectedLanguageButtonText
                  ]}>
                    {lang.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          showArrow={false}
        />

        <SettingItem
          icon={<Download size={24} color={colors.primary} />}
          title={t.offlineContent}
          subtitle={`${t.usedSpace}: 1.2 ${t.gb} / 2.0 ${t.gb}`}
          onPress={() => {}}
        />
      </View>

      {/* Audio & Accessibility */}
      <View style={styles.section}>
        <SettingItem
          icon={<Volume2 size={24} color={colors.primary} />}
          title={t.audioSettings}
          subtitle={`${t.voiceSpeed}: ${t[voiceSpeed as keyof typeof t]}`}
          onPress={() => {}}
          rightComponent={
            <View style={styles.speedButtons}>
              {['slow', 'normal', 'fast'].map(speed => (
                <TouchableOpacity
                  key={speed}
                  style={[
                    styles.speedButton,
                    voiceSpeed === speed && styles.selectedSpeedButton
                  ]}
                  onPress={() => setVoiceSpeed(speed)}
                >
                  <Text style={[
                    styles.speedButtonText,
                    voiceSpeed === speed && styles.selectedSpeedButtonText
                  ]}>
                    {t[speed as keyof typeof t]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          showArrow={false}
        />

        <SettingItem
          icon={<Eye size={24} color={colors.primary} />}
          title={t.accessibility}
          subtitle={`${t.textSize}: ${t[textSize as keyof typeof t]}`}
          onPress={() => {}}
          rightComponent={
            <View style={styles.sizeButtons}>
              {['small', 'medium', 'large'].map(size => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    textSize === size && styles.selectedSizeButton
                  ]}
                  onPress={() => setTextSize(size)}
                >
                  <Text style={[
                    styles.sizeButtonText,
                    textSize === size && styles.selectedSizeButtonText
                  ]}>
                    {t[size as keyof typeof t]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          showArrow={false}
        />
      </View>

      {/* Storage Info */}
      <View style={styles.section}>
        <SettingItem
          icon={<Smartphone size={24} color={colors.primary} />}
          title={t.storage}
          subtitle={`${t.downloadedContent}: 45 lecciones`}
          onPress={() => {}}
        />
      </View>

      {/* Help & Support */}
      <View style={styles.section}>
        <SettingItem
          icon={<HelpCircle size={24} color={colors.primary} />}
          title={t.help}
          subtitle={t.tutorials}
          onPress={() => {}}
        />

        <SettingItem
          icon={<Shield size={24} color={colors.primary} />}
          title={t.about}
          subtitle={`${t.version} 1.0.0`}
          onPress={() => {}}
        />
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <SettingItem
          icon={<LogOut size={24} color={colors.error} />}
          title={t.logout}
          onPress={handleLogout}
          showArrow={false}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Yatiqaña - Educación para todos los niños de Bolivia
        </Text>
        <Text style={styles.footerVersion}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  settingRight: {
    marginLeft: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  languageButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  selectedLanguageButton: {
    backgroundColor: colors.primary,
  },
  languageButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedLanguageButtonText: {
    color: colors.surface,
  },
  speedButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  speedButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  selectedSpeedButton: {
    backgroundColor: colors.primary,
  },
  speedButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedSpeedButtonText: {
    color: colors.surface,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  sizeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  selectedSizeButton: {
    backgroundColor: colors.primary,
  },
  sizeButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  selectedSizeButtonText: {
    color: colors.surface,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerVersion: {
    fontSize: 10,
    color: colors.textSecondary,
  },
});
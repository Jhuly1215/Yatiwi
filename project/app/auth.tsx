import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';
import { User, GraduationCap, Shield } from 'lucide-react-native';

const translations = {
  es: {
    title: 'Bienvenido',
    subtitle: 'Selecciona tu tipo de cuenta',
    student: 'Estudiante',
    teacher: 'Docente',
    studentDesc: 'Aprende y practica',
    teacherDesc: 'Enseña y administra',
    pinTitle: 'Ingresa tu PIN',
    pinSubtitle: 'Código de 4 dígitos',
    continueBtn: 'Continuar',
  },
  ay: {
    title: 'Aski jutawi',
    subtitle: 'Kunas kasktanxa ajlliña',
    student: 'Yatiqiri',
    teacher: 'Yatichiri',
    studentDesc: 'Yatiqaña ukat luraña',
    teacherDesc: 'Yatichawi ukat apnaqa',
    pinTitle: 'PIN ukaxa apsuña',
    pinSubtitle: 'Pusi jakhunak',
    continueBtn: 'Saraña',
  },
  qu: {
    title: 'Allin hamusqayki',
    subtitle: 'Imayna kasqaykita akllay',
    student: 'Yachakuq',
    teacher: 'Yachachiq',
    studentDesc: 'Yachay hinaspa ruway',
    teacherDesc: 'Yachachiy hinaspa kamachiy',
    pinTitle: 'PIN-niyki churay',
    pinSubtitle: 'Tawa yupaykunamanta',
    continueBtn: 'Puririchiy',
  },
};

export default function AuthScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [pin, setPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);

  const t = translations[language as keyof typeof translations] || translations.es;

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    setShowPinInput(true);
  };

  const handlePinPress = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handlePinClear = () => {
    setPin('');
  };

  const handleContinue = () => {
    if (pin.length === 4) {
      // Store auth data locally
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Por favor ingresa un PIN de 4 dígitos');
    }
  };

  if (showPinInput) {
    return (
      <View style={styles.container}>
        <View style={styles.pinHeader}>
          <View style={styles.roleIcon}>
            {selectedRole === 'student' ? (
              <User size={32} color={colors.primary} />
            ) : (
              <GraduationCap size={32} color={colors.primary} />
            )}
          </View>
          <Text style={styles.pinTitle}>{t.pinTitle}</Text>
          <Text style={styles.pinSubtitle}>{t.pinSubtitle}</Text>
        </View>

        <View style={styles.pinDisplay}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.pinDot}>
              {pin.length > index && <View style={styles.pinDotFilled} />}
            </View>
          ))}
        </View>

        <View style={styles.pinPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.pinButton}
              onPress={() => handlePinPress(digit.toString())}
            >
              <Text style={styles.pinButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.pinButton}
            onPress={handlePinClear}
          >
            <Text style={styles.pinButtonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => handlePinPress('0')}
          >
            <Text style={styles.pinButtonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pinButton}
            onPress={() => setPin(pin.slice(0, -1))}
          >
            <Text style={styles.pinButtonText}>⌫</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, pin.length === 4 && styles.continueButtonActive]}
          onPress={handleContinue}
          disabled={pin.length !== 4}
        >
          <Text style={[styles.continueButtonText, pin.length === 4 && styles.continueButtonTextActive]}>
            {t.continueBtn}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Shield size={48} color={colors.primary} />
        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
      </View>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelect('student')}
        >
          <User size={48} color={colors.primary} />
          <Text style={styles.roleTitle}>{t.student}</Text>
          <Text style={styles.roleDescription}>{t.studentDesc}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelect('teacher')}
        >
          <GraduationCap size={48} color={colors.primary} />
          <Text style={styles.roleTitle}>{t.teacher}</Text>
          <Text style={styles.roleDescription}>{t.teacherDesc}</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  roleContainer: {
    gap: 20,
  },
  roleButton: {
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  pinHeader: {
    alignItems: 'center',
    marginBottom: 48,
  },
  roleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  pinTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  pinSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 48,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDotFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  pinPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  pinButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pinButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  continueButton: {
    backgroundColor: colors.border,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  continueButtonActive: {
    backgroundColor: colors.primary,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  continueButtonTextActive: {
    color: colors.surface,
  },
});
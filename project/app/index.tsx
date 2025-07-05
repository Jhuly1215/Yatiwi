import { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/language-select');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Yatiqaña</Text>
        <Text style={styles.subtitle}>Aprendiendo Juntos</Text>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingDot} />
          <View style={[styles.loadingDot, { opacity: 0.7 }]} />
          <View style={[styles.loadingDot, { opacity: 0.4 }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
});
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, Play, Users, TrendingUp, Bell } from 'lucide-react-native';

const translations = {
  es: {
    welcome: 'Bienvenido',
    todaysLessons: 'Lecciones de Hoy',
    recentProgress: 'Progreso Reciente',
    quickActions: 'Acciones Rápidas',
    exploreContent: 'Explorar Contenido',
    takeTest: 'Tomar Evaluación',
    viewProgress: 'Ver Progreso',
    classmates: 'Compañeros',
    notifications: 'Notificaciones',
    mathTitle: 'Matemáticas - Números',
    scienceTitle: 'Ciencias - Plantas',
    languageTitle: 'Lenguaje - Lectura',
    completedLessons: 'lecciones completadas',
    offlineReady: 'Listo para usar sin conexión',
  },
  ay: {
    welcome: 'Aski jutawi',
    todaysLessons: 'Jichhun Yatiqawinaka',
    recentProgress: 'Qhipa Sarantawi',
    quickActions: 'Jank\'ak Lurawi',
    exploreContent: 'Yatiqawinaka Thaqhaña',
    takeTest: 'Yant\'aña Lurawi',
    viewProgress: 'Sarantawi Uñjaña',
    classmates: 'Yatiqiri Masipana',
    notifications: 'Yatiyawinaka',
    mathTitle: 'Jakhuña - Jakhunaka',
    scienceTitle: 'Yatiqawinaka - Alikhunaka',
    languageTitle: 'Aru - Ullaña',
    completedLessons: 'yatiqawinaka tukuyata',
    offlineReady: 'Jan internet ukampiw lurañataki wakiskiri',
  },
  qu: {
    welcome: 'Allin hamusqayki',
    todaysLessons: 'Kunap Yachayninchik',
    recentProgress: 'Qhipa Ñawpaqman',
    quickActions: 'Utqay Ruraykunaq',
    exploreContent: 'Yachayninchikta Maskay',
    takeTest: 'Pruebata Ruray',
    viewProgress: 'Ñawpaqman Qhaway',
    classmates: 'Yachakuq Masiyuna',
    notifications: 'Willaykunaq',
    mathTitle: 'Yupay - Yupaykunaq',
    scienceTitle: 'Yachaykunaq - Yurakunaq',
    languageTitle: 'Rimay - Ñawiy',
    completedLessons: 'yachaykunaq tukusqa',
    offlineReady: 'Mana internet nisqawan llamk\'anapaq wakana',
  },
};

const todaysLessons = [
  {
    id: 1,
    title: 'mathTitle',
    image: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    progress: 75,
    duration: '15 min',
  },
  {
    id: 2,
    title: 'scienceTitle',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    progress: 50,
    duration: '20 min',
  },
  {
    id: 3,
    title: 'languageTitle',
    image: 'https://images.pexels.com/photos/159775/library-book-reading-159775.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    progress: 25,
    duration: '10 min',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>{t.welcome}</Text>
          <Text style={styles.userName}>María</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.primary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.offlineStatus}>
        <View style={styles.offlineIndicator} />
        <Text style={styles.offlineText}>{t.offlineReady}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.todaysLessons}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {todaysLessons.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
              <Image source={{ uri: lesson.image }} style={styles.lessonImage} />
              <View style={styles.lessonContent}>
                <Text style={styles.lessonTitle}>{t[lesson.title as keyof typeof t]}</Text>
                <View style={styles.lessonMeta}>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${lesson.progress}%` }]} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.quickActions}</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => router.push('/library')}
          >
            <BookOpen size={32} color={colors.primary} />
            <Text style={styles.quickActionText}>{t.exploreContent}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Play size={32} color={colors.accent} />
            <Text style={styles.quickActionText}>{t.takeTest}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => router.push('/progress')}
          >
            <TrendingUp size={32} color={colors.success} />
            <Text style={styles.quickActionText}>{t.viewProgress}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Users size={32} color={colors.secondary} />
            <Text style={styles.quickActionText}>{t.classmates}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.recentProgress}</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Esta Semana</Text>
            <Text style={styles.progressNumber}>12</Text>
          </View>
          <Text style={styles.progressSubtitle}>{t.completedLessons}</Text>
          <View style={styles.weeklyProgress}>
            {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
              <View key={index} style={styles.progressDay}>
                <View style={[styles.progressBar, { height: height / 2 }]} />
                <Text style={styles.progressDayLabel}>
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.surface,
  },
  offlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 12,
    backgroundColor: colors.successLight,
    borderRadius: 8,
  },
  offlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  offlineText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  horizontalScroll: {
    paddingLeft: 24,
  },
  lessonCard: {
    width: 280,
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  lessonImage: {
    width: '100%',
    height: 120,
  },
  lessonContent: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lessonDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  progressCard: {
    marginHorizontal: 24,
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  weeklyProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: 8,
  },
  progressDay: {
    alignItems: 'center',
    gap: 8,
  },
  progressDayLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
});
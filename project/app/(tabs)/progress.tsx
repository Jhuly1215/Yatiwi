import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';
import { TrendingUp, Award, Clock, Target, Calendar, Download } from 'lucide-react-native';

const translations = {
  es: {
    title: 'Mi Progreso',
    weeklyProgress: 'Progreso Semanal',
    achievements: 'Logros',
    studyTime: 'Tiempo de Estudio',
    completedLessons: 'Lecciones Completadas',
    currentStreak: 'Racha Actual',
    totalPoints: 'Puntos Totales',
    thisWeek: 'Esta Semana',
    thisMonth: 'Este Mes',
    allTime: 'Todo el Tiempo',
    hours: 'horas',
    lessons: 'lecciones',
    days: 'días',
    points: 'puntos',
    exportReport: 'Exportar Reporte',
    viewDetails: 'Ver Detalles',
    math: 'Matemáticas',
    science: 'Ciencias',
    language: 'Lenguaje',
    social: 'Sociales',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    firstLesson: 'Primera Lección',
    weekStreak: 'Semana Completa',
    monthStreak: 'Mes Completo',
    perfectScore: 'Puntaje Perfecto',
  },
  ay: {
    title: 'Nayan Sarantawi',
    weeklyProgress: 'Siman Sarantawi',
    achievements: 'Ayninaka',
    studyTime: 'Yatiqawi Pacha',
    completedLessons: 'Tukuyat Yatiqawinaka',
    currentStreak: 'Jichhak Sarantawi',
    totalPoints: 'Taqi Puntos',
    thisWeek: 'Aka Siman',
    thisMonth: 'Aka Phaxsi',
    allTime: 'Taqi Pacha',
    hours: 'horas',
    lessons: 'yatiqawinaka',
    days: 'uruka',
    points: 'puntos',
    exportReport: 'Yatiyawi Apsuña',
    viewDetails: 'Suma Uñjawi',
    math: 'Jakhuña',
    science: 'Yatiqawinaka',
    language: 'Aru',
    social: 'Jaqinaka',
    beginner: 'Qalltiri',
    intermediate: 'Chika',
    advanced: 'Suma yatiri',
    firstLesson: 'Nayriri Yatiqawi',
    weekStreak: 'Siman Tukuyawi',
    monthStreak: 'Phaxsin Tukuyawi',
    perfectScore: 'Suma Puntos',
  },
  qu: {
    title: 'Ñuqap Ñawpaqman',
    weeklyProgress: 'Siman Ñawpaqman',
    achievements: 'Ayninakuna',
    studyTime: 'Yachay Pacha',
    completedLessons: 'Tukusqa Yachaykunaq',
    currentStreak: 'Kunaq Ñawpaqman',
    totalPoints: 'Llapan Puntos',
    thisWeek: 'Kay Siman',
    thisMonth: 'Kay Killa',
    allTime: 'Llapan Pacha',
    hours: 'horas',
    lessons: 'yachaykunaq',
    days: 'p\'unchawkuna',
    points: 'puntos',
    exportReport: 'Willay Apay',
    viewDetails: 'Suma Qhaway',
    math: 'Yupay',
    science: 'Yachaykunaq',
    language: 'Rimay',
    social: 'Runakuna',
    beginner: 'Qallariq',
    intermediate: 'Chawpi',
    advanced: 'Sumaq yachaq',
    firstLesson: 'Ñawpaq Yachay',
    weekStreak: 'Siman Tukuy',
    monthStreak: 'Killa Tukuy',
    perfectScore: 'Suma Puntos',
  },
};

const weeklyData = [
  { day: 'L', progress: 85, lessons: 3 },
  { day: 'M', progress: 92, lessons: 4 },
  { day: 'X', progress: 78, lessons: 2 },
  { day: 'J', progress: 96, lessons: 5 },
  { day: 'V', progress: 88, lessons: 3 },
  { day: 'S', progress: 72, lessons: 2 },
  { day: 'D', progress: 84, lessons: 3 },
];

const achievements = [
  { id: 1, name: 'firstLesson', icon: '🎯', earned: true, date: '2024-01-15' },
  { id: 2, name: 'weekStreak', icon: '🔥', earned: true, date: '2024-01-20' },
  { id: 3, name: 'monthStreak', icon: '🏆', earned: false, date: null },
  { id: 4, name: 'perfectScore', icon: '⭐', earned: true, date: '2024-01-18' },
];

const subjectProgress = [
  { name: 'math', progress: 85, color: colors.accent },
  { name: 'science', progress: 72, color: colors.success },
  { name: 'language', progress: 91, color: colors.secondary },
  { name: 'social', progress: 68, color: colors.warning },
];

export default function ProgressScreen() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.title}</Text>
        <TouchableOpacity style={styles.exportButton}>
          <Download size={20} color={colors.primary} />
          <Text style={styles.exportButtonText}>{t.exportReport}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Clock size={24} color={colors.primary} />
          </View>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>{t.hours}</Text>
          <Text style={styles.statPeriod}>{t.thisWeek}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Target size={24} color={colors.success} />
          </View>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>{t.lessons}</Text>
          <Text style={styles.statPeriod}>{t.thisWeek}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={24} color={colors.accent} />
          </View>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>{t.days}</Text>
          <Text style={styles.statPeriod}>{t.currentStreak}</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Award size={24} color={colors.warning} />
          </View>
          <Text style={styles.statNumber}>1250</Text>
          <Text style={styles.statLabel}>{t.points}</Text>
          <Text style={styles.statPeriod}>{t.totalPoints}</Text>
        </View>
      </View>

      {/* Weekly Progress Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.weeklyProgress}</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={styles.chartBarContainer}>
                  <View style={[styles.chartBarFill, { height: `${day.progress}%` }]} />
                </View>
                <Text style={styles.chartLabel}>{day.day}</Text>
                <Text style={styles.chartValue}>{day.lessons}</Text>
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.legendText}>{t.completedLessons}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Subject Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progreso por Materia</Text>
        <View style={styles.subjectContainer}>
          {subjectProgress.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{t[subject.name as keyof typeof t]}</Text>
                <Text style={styles.subjectProgress}>{subject.progress}%</Text>
              </View>
              <View style={styles.subjectProgressBar}>
                <View style={[
                  styles.subjectProgressFill,
                  { width: `${subject.progress}%`, backgroundColor: subject.color }
                ]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.achievements}</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={[
              styles.achievementCard,
              !achievement.earned && styles.achievementCardLocked
            ]}>
              <Text style={[
                styles.achievementIcon,
                !achievement.earned && styles.achievementIconLocked
              ]}>
                {achievement.icon}
              </Text>
              <Text style={[
                styles.achievementName,
                !achievement.earned && styles.achievementNameLocked
              ]}>
                {t[achievement.name as keyof typeof t]}
              </Text>
              {achievement.earned && achievement.date && (
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Detailed Stats */}
      <View style={styles.section}>
        <View style={styles.detailedStats}>
          <TouchableOpacity style={styles.detailedStatCard}>
            <View style={styles.detailedStatHeader}>
              <Text style={styles.detailedStatTitle}>{t.thisMonth}</Text>
              <Text style={styles.detailedStatValue}>45</Text>
            </View>
            <Text style={styles.detailedStatSubtitle}>{t.completedLessons}</Text>
            <Text style={styles.detailedStatChange}>+12% vs mes anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailedStatCard}>
            <View style={styles.detailedStatHeader}>
              <Text style={styles.detailedStatTitle}>{t.allTime}</Text>
              <Text style={styles.detailedStatValue}>156</Text>
            </View>
            <Text style={styles.detailedStatSubtitle}>{t.totalPoints}</Text>
            <Text style={styles.detailedStatChange}>Nivel: {t.intermediate}</Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  exportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '47%',
    gap: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statPeriod: {
    fontSize: 10,
    color: colors.textSecondary,
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
  chartContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'end',
    height: 120,
    marginBottom: 16,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarContainer: {
    width: 24,
    height: 80,
    backgroundColor: colors.border,
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  chartLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  chartValue: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  subjectContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  subjectCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  subjectProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subjectProgressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
  },
  achievementCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '47%',
    gap: 8,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  achievementNameLocked: {
    color: colors.textSecondary,
  },
  achievementDate: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  detailedStats: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
  },
  detailedStatCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    flex: 1,
  },
  detailedStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailedStatTitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  detailedStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  detailedStatSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailedStatChange: {
    fontSize: 10,
    color: colors.success,
    fontWeight: '600',
  },
});
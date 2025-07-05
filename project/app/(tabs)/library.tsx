import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, Play, Download, Search, Filter } from 'lucide-react-native';

const translations = {
  es: {
    title: 'Biblioteca de Contenidos',
    searchPlaceholder: 'Buscar lecciones...',
    subjects: 'Materias',
    allSubjects: 'Todas las Materias',
    mathematics: 'Matemáticas',
    science: 'Ciencias Naturales',
    language: 'Comunicación y Lenguajes',
    social: 'Ciencias Sociales',
    downloaded: 'Descargado',
    lessons: 'lecciones',
    minutes: 'min',
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  },
  ay: {
    title: 'Yatiqawinakan Biblioteca',
    searchPlaceholder: 'Yatiqawinaka thaqhaña...',
    subjects: 'Yatiqawi t\'aqanaka',
    allSubjects: 'Taqi Yatiqawi t\'aqanaka',
    mathematics: 'Jakhuña',
    science: 'Pachamaman Yatiqawinaka',
    language: 'Aruskipaña ukat Arunaka',
    social: 'Jaqinakan Yatiqawinaka',
    downloaded: 'Apaqata',
    lessons: 'yatiqawinaka',
    minutes: 'min',
    beginner: 'Qalltiri',
    intermediate: 'Chika',
    advanced: 'Suma yatiri',
  },
  qu: {
    title: 'Yachaykunaq Biblioteca',
    searchPlaceholder: 'Yachaykunata maskay...',
    subjects: 'Yachay t\'aqakuna',
    allSubjects: 'Llapa Yachay t\'aqakuna',
    mathematics: 'Yupay',
    science: 'Pachamama Yachaykunaq',
    language: 'Rimanakuy Simikunaq',
    social: 'Runakuna Yachaykunaq',
    downloaded: 'Apasqa',
    lessons: 'yachaykunaq',
    minutes: 'min',
    beginner: 'Qallariq',
    intermediate: 'Chawpi',
    advanced: 'Sumaq yachaq',
  },
};

const subjects = [
  {
    id: 'all',
    name: 'allSubjects',
    icon: '📚',
    color: colors.primary,
  },
  {
    id: 'math',
    name: 'mathematics',
    icon: '🔢',
    color: colors.accent,
  },
  {
    id: 'science',
    name: 'science',
    icon: '🔬',
    color: colors.success,
  },
  {
    id: 'language',
    name: 'language',
    icon: '📖',
    color: colors.secondary,
  },
  {
    id: 'social',
    name: 'social',
    icon: '🌍',
    color: colors.warning,
  },
];

const lessons = [
  {
    id: 1,
    title: 'Números del 1 al 10',
    subject: 'math',
    image: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 15,
    level: 'beginner',
    downloaded: true,
    progress: 75,
  },
  {
    id: 2,
    title: 'Las Plantas y sus Partes',
    subject: 'science',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 20,
    level: 'beginner',
    downloaded: true,
    progress: 50,
  },
  {
    id: 3,
    title: 'Lectura Comprensiva',
    subject: 'language',
    image: 'https://images.pexels.com/photos/159775/library-book-reading-159775.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 25,
    level: 'intermediate',
    downloaded: false,
    progress: 0,
  },
  {
    id: 4,
    title: 'Mi Comunidad',
    subject: 'social',
    image: 'https://images.pexels.com/photos/1187317/pexels-photo-1187317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 18,
    level: 'beginner',
    downloaded: true,
    progress: 25,
  },
  {
    id: 5,
    title: 'Suma y Resta',
    subject: 'math',
    image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 22,
    level: 'intermediate',
    downloaded: true,
    progress: 90,
  },
  {
    id: 6,
    title: 'El Agua y sus Estados',
    subject: 'science',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    duration: 16,
    level: 'intermediate',
    downloaded: false,
    progress: 0,
  },
];

export default function LibraryScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[language as keyof typeof translations] || translations.es;

  const filteredLessons = lessons.filter(lesson => {
    const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return colors.success;
      case 'intermediate': return colors.warning;
      case 'advanced': return colors.error;
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t.title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectsScroll}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject.id}
            style={[
              styles.subjectCard,
              selectedSubject === subject.id && styles.selectedSubjectCard
            ]}
            onPress={() => setSelectedSubject(subject.id)}
          >
            <Text style={styles.subjectIcon}>{subject.icon}</Text>
            <Text style={[
              styles.subjectName,
              selectedSubject === subject.id && styles.selectedSubjectName
            ]}>
              {t[subject.name as keyof typeof t]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.lessonsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.lessonsList}>
          {filteredLessons.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={styles.lessonCard}>
              <Image source={{ uri: lesson.image }} style={styles.lessonImage} />
              
              <View style={styles.lessonContent}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <View style={styles.lessonBadges}>
                    <View style={[styles.levelBadge, { backgroundColor: getLevelColor(lesson.level) + '20' }]}>
                      <Text style={[styles.levelText, { color: getLevelColor(lesson.level) }]}>
                        {t[lesson.level as keyof typeof t]}
                      </Text>
                    </View>
                    {lesson.downloaded && (
                      <View style={styles.downloadedBadge}>
                        <Download size={12} color={colors.success} />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.lessonMeta}>
                  <Text style={styles.lessonDuration}>{lesson.duration} {t.minutes}</Text>
                  <Text style={styles.lessonSubject}>
                    {t[subjects.find(s => s.id === lesson.subject)?.name as keyof typeof t]}
                  </Text>
                </View>

                {lesson.progress > 0 && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${lesson.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{lesson.progress}%</Text>
                  </View>
                )}

                <View style={styles.lessonActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.primaryButton]}
                    onPress={() => router.push(`/lesson/${lesson.id}`)}
                  >
                    <Play size={16} color={colors.surface} />
                    <Text style={styles.primaryButtonText}>
                      {lesson.progress > 0 ? 'Continuar' : 'Comenzar'}
                    </Text>
                  </TouchableOpacity>
                  
                  {!lesson.downloaded && (
                    <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
                      <Download size={16} color={colors.primary} />
                      <Text style={styles.secondaryButtonText}>Descargar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  filterButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  subjectsScroll: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  subjectCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 80,
  },
  selectedSubjectCard: {
    backgroundColor: colors.primary,
  },
  subjectIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  selectedSubjectName: {
    color: colors.surface,
  },
  lessonsContainer: {
    flex: 1,
  },
  lessonsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  lessonCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  lessonImage: {
    width: '100%',
    height: 120,
  },
  lessonContent: {
    padding: 16,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  lessonBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
  },
  downloadedBadge: {
    backgroundColor: colors.successLight,
    padding: 4,
    borderRadius: 6,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lessonDuration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  lessonSubject: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  lessonActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.surface,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
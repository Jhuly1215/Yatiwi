import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react-native';

interface AudioPlayerProps {
  text: string;
  language: string;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export function AudioPlayer({ text, language, onPlayingChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Mock TTS implementation for demonstration
  const handlePlayPause = () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    onPlayingChange?.(newPlayingState);

    if (newPlayingState) {
      // Mock audio duration
      setDuration(text.length * 0.1); // Rough estimate
      
      // Mock progress tracking
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
  };

  const handleRewind = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }
            ]}
          />
        </View>
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleRewind}>
          <SkipBack size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          {isPlaying ? (
            <Pause size={32} color={colors.surface} />
          ) : (
            <Play size={32} color={colors.surface} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={handleForward}>
          <SkipForward size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.languageIndicator}>
        <Volume2 size={16} color={colors.textSecondary} />
        <Text style={styles.languageText}>
          {language === 'es' ? 'Español' : language === 'ay' ? 'Aymara' : 'Quechua'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginVertical: 12,
    gap: 12,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  languageText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
}

export function ProgressCircle({ 
  progress, 
  size = 80, 
  strokeWidth = 8,
  color = colors.primary,
  backgroundColor = colors.border,
  showText = true 
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <svg width={size} height={size} style={styles.svg}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={styles.progressCircle}
        />
      </svg>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  progressCircle: {
    transition: 'stroke-dashoffset 0.5s ease',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
});
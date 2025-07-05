import { useEffect, useState } from 'react';
import { getUserAchievements } from '../services/achievements';

export const useAchievements = (userId: string) => {
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;
    getUserAchievements(userId).then(setAchievements);
  }, [userId]);

  return achievements;
};
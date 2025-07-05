// File: project/hooks/useUserAchievements.ts

import { useState, useEffect } from 'react';
import { getUserAchievements, insertUserAchievement, deleteUserAchievement, UserAchievementRow } from '../src/database/userAchievements';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

interface UseUserAchievementsResult {
  items: UserAchievementRow[];
  loading: boolean;
  error: Error | null;
  reload: () => void;
  award: (achievementId: string) => Promise<string>;
  revoke: (uaId: string) => Promise<void>;
}

export function useUserAchievements(): UseUserAchievementsResult {
  const { userId } = useContext(UserContext);
  const [items, setItems] = useState<UserAchievementRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getUserAchievements(userId);
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [userId]);

  const award = async (achievementId: string) => {
    const id = await insertUserAchievement(userId, achievementId);
    await load();
    return id;
  };

  const revoke = async (uaId: string) => {
    await deleteUserAchievement(uaId);
    await load();
  };

  return { items, loading, error, reload: load, award, revoke };
}

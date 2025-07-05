import { useState, useEffect } from 'react';
import {
  getAllAchievements,       // tu función CRUD desde src/database/achievements.ts
  AchievementRow
} from '../src/database/achievements';

export function useAchievements() {
  const [items, setItems] = useState<AchievementRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllAchievements();
      setItems(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reload = () => {
    load();
  };

  return { items, loading, error, reload };
}
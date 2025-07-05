import { useEffect, useState } from 'react';
import {
  getUserSummary,
  getWeeklyProgress,
  getSubjectProgress,
  getUserStats
} from '../services/dashboard';

export const useDashboardStats = (userId: string) => {
  const [summary, setSummary] = useState<any>(null);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const [s, w, sp, st] = await Promise.all([
        getUserSummary(userId),
        getWeeklyProgress(userId),
        getSubjectProgress(userId),
        getUserStats(userId)
      ]);
      setSummary(s);
      setWeekly(w);
      setSubjects(sp);
      setStats(st);
    })();
  }, [userId]);

  return { summary, weekly, subjects, stats };
};
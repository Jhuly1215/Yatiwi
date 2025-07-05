import { getDB } from '../utils/db';
import { Progress, ProgressCreate } from '../types/progressTypes';
import { v4 as uuid } from 'uuid';

export const ProgressModel = {
  async createOrUpdate(progress: ProgressCreate): Promise<void> {
    const db = await getDB();
    const id = `${progress.user_id}_${progress.date}`;
    await db.run(`
      INSERT INTO progress (id, user_id, date, time_spent, lessons_completed, points_earned, current_streak)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        time_spent=excluded.time_spent,
        lessons_completed=excluded.lessons_completed,
        points_earned=excluded.points_earned,
        current_streak=excluded.current_streak
    `, id, progress.user_id, progress.date, progress.time_spent, progress.lessons_completed, progress.points_earned, progress.current_streak);
  },

  async getByUser(user_id: string): Promise<Progress[]> {
    const db = await getDB();
    return db.all<Progress[]>('SELECT * FROM progress WHERE user_id = ?', user_id);
  }
};

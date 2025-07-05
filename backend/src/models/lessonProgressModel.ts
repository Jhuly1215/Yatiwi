import { getDB } from '../utils/db';
import { LessonProgress, LessonProgressCreate } from '../types/lessonProgressTypes';

export const LessonProgressModel = {
  async createOrUpdate(progress: LessonProgressCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO lesson_progress (id, user_id, lesson_id, status, progress_percent, score, last_accessed)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        status=excluded.status,
        progress_percent=excluded.progress_percent,
        score=excluded.score,
        last_accessed=CURRENT_TIMESTAMP
    `, progress.id, progress.user_id, progress.lesson_id, progress.status, progress.progress_percent, progress.score);
  },

  async getByUserAndLesson(user_id: string, lesson_id: string): Promise<LessonProgress | undefined> {
    const db = await getDB();
    return db.get<LessonProgress>(
      'SELECT * FROM lesson_progress WHERE user_id = ? AND lesson_id = ?',
      user_id, lesson_id
    );
  }
};

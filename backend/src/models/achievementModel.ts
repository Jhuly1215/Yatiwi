import { getDB } from '../utils/db';
import { Achievement, AchievementCreate, UserAchievement, UserAchievementCreate } from '../types/achievementTypes';
import { v4 as uuid } from 'uuid';

export const AchievementModel = {
  async createAchievement(data: AchievementCreate): Promise<string> {
    const db = await getDB();
    const id = uuid();
    await db.run(`
      INSERT INTO achievements (id, code, title, description, icon_url, points)
      VALUES (?, ?, ?, ?, ?, ?)`,
      id,
      data.code,
      JSON.stringify(data.title),
      JSON.stringify(data.description),
      data.icon_url,
      data.points
    );
    return id;
  },

  async getAllAchievements(): Promise<Achievement[]> {
    const db = await getDB();
    const rows = await db.all<Achievement[]>('SELECT * FROM achievements');
    return rows.map(row => ({
      ...row,
      title: JSON.parse(row.title as unknown as string),
      description: JSON.parse(row.description as unknown as string)
    }));
  },

  async assignAchievement(data: UserAchievementCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO user_achievements (id, user_id, achievement_id, earned_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      data.id, data.user_id, data.achievement_id
    );
  },

  async getUserAchievements(user_id: string): Promise<UserAchievement[]> {
    const db = await getDB();
    return db.all<UserAchievement[]>(`
      SELECT ua.id, ua.user_id, ua.achievement_id, ua.earned_at
      FROM user_achievements ua
      WHERE ua.user_id = ?`, user_id);
  }
};

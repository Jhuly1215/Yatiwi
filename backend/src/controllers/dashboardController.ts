import { Request, Response } from 'express';
import { getDB } from '../utils/db';

// Helpers para fechas
const getStartOfWeek = () => {
  const d = new Date();
  const diff = d.getDay() === 0 ? -6 : 1 - d.getDay();
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
};

const getCurrentMonth = () => new Date().toISOString().slice(0, 7); // yyyy-mm

export const DashboardController = {
  // 1. Resumen general semanal y total
  async getSummary(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const db = await getDB();
      const startOfWeek = getStartOfWeek();

      const summary = await db.get<{
        hours: number;
        lessons: number;
        streak: number;
        total_points: number;
      }>(
        `
        SELECT 
          SUM(CASE WHEN date >= ? THEN time_spent ELSE 0 END) as hours,
          SUM(CASE WHEN date >= ? THEN lessons_completed ELSE 0 END) as lessons,
          MAX(current_streak) as streak,
          SUM(points_earned) as total_points
        FROM progress
        WHERE user_id = ?
        `,
        startOfWeek,
        startOfWeek,
        user_id
      );

      res.json({
        hours_this_week: summary?.hours || 0,
        lessons_this_week: summary?.lessons || 0,
        current_streak: summary?.streak || 0,
        total_points: summary?.total_points || 0,
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to load summary' });
    }
  },

  // 2. Progreso semanal por día
  async getWeeklyProgress(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const db = await getDB();
      const startOfWeek = getStartOfWeek();

      const rows = await db.all<{ date: string; lessons_completed: number }[]>(
        `
        SELECT date, lessons_completed
        FROM progress
        WHERE user_id = ? AND date >= ?
        `,
        user_id,
        startOfWeek
      );

      // Convertir a formato L, M, X, J, V, S, D
      const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
      const result = Array.from({ length: 7 }, (_, i) => {
        const day = days[(i + 1) % 7]; // Ajustar para que lunes sea index 0
        return { day, count: 0 };
      });

      for (const row of rows) {
        const d = new Date(row.date);
        const day = (d.getDay() + 6) % 7; // lunes = 0
        result[day].count += row.lessons_completed;
      }

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load weekly progress' });
    }
  },

  // 3. Progreso por materia
  async getSubjectProgress(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const db = await getDB();
      const rows = await db.all<any[]>(
        `
        SELECT s.name as subject, AVG(lp.progress_percent) as percentage
        FROM lesson_progress lp
        JOIN lessons l ON l.id = lp.lesson_id
        JOIN subjects s ON s.id = l.subject_id
        WHERE lp.user_id = ?
        GROUP BY s.id
        `,
        user_id
      );

      res.json(rows.map(r => ({
        subject: r.subject,
        percentage: Math.round(r.percentage)
      })));
    } catch (err) {
      res.status(500).json({ error: 'Failed to load subject progress' });
    }
  },

  // 4. Stats mensuales y totales
  async getStats(req: Request, res: Response) {
    const { user_id } = req.params;
    try {
      const db = await getDB();
      const thisMonth = getCurrentMonth();
      const [current, previous] = await Promise.all([
        db.get<{ sum: number }>(
          `SELECT SUM(lessons_completed) as sum FROM progress WHERE user_id = ? AND date LIKE ?`,
          user_id,
          `${thisMonth}%`
        ),
        db.get<{ sum: number }>(
          `SELECT SUM(lessons_completed) as sum FROM progress WHERE user_id = ? AND strftime('%m', date) = strftime('%m', date, '-1 month')`,
          user_id
        ),
      ]);

      const total = await db.get<{ sum: number }>(
        `SELECT SUM(lessons_completed) as sum FROM progress WHERE user_id = ?`,
        user_id
      );

      const variation = previous?.sum
        ? Math.round(((current?.sum || 0) - previous.sum) / previous.sum * 100)
        : 0;

      res.json({
        this_month: current?.sum || 0,
        all_time: total?.sum || 0,
        month_variation_percent: variation
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to load stats' });
    }
  }
};

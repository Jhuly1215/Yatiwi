import { Request, Response } from 'express';
import { LessonProgressModel } from '../models/lessonProgressModel';
import { v4 as uuid } from 'uuid';

export const LessonProgressController = {
  async saveProgress(req: Request, res: Response) {
    try {
      const { user_id, lesson_id, status, progress_percent, score } = req.body;
      const id = `${user_id}_${lesson_id}`;
      await LessonProgressModel.createOrUpdate({ id, user_id, lesson_id, status, progress_percent, score });
      res.json({ message: 'Progress saved/updated' });
    } catch {
      res.status(500).json({ error: 'Failed to save progress' });
    }
  },

  async getProgress(req: Request, res: Response) {
    try {
      const { user_id, lesson_id } = req.params;
      const data = await LessonProgressModel.getByUserAndLesson(user_id, lesson_id);
      data ? res.json(data) : res.status(404).json({ error: 'No progress found' });
    } catch {
      res.status(500).json({ error: 'Failed to retrieve progress' });
    }
  }
};

import { Request, Response } from 'express';
import { ProgressModel } from '../models/progressModel';

export const ProgressController = {
  async saveProgress(req: Request, res: Response) {
    try {
      await ProgressModel.createOrUpdate(req.body);
      res.json({ message: 'User daily progress saved/updated' });
    } catch {
      res.status(500).json({ error: 'Failed to save daily progress' });
    }
  },

  async getUserProgress(req: Request, res: Response) {
    try {
      const progress = await ProgressModel.getByUser(req.params.user_id);
      res.json(progress);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve user progress' });
    }
  }
};

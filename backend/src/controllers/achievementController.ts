import { Request, Response } from 'express';
import { AchievementModel } from '../models/achievementModel';
import { v4 as uuid } from 'uuid';

export const AchievementController = {
  async createAchievement(req: Request, res: Response) {
    try {
      const id = await AchievementModel.createAchievement(req.body);
      res.status(201).json({ message: 'Achievement created', id });
    } catch {
      res.status(500).json({ error: 'Failed to create achievement' });
    }
  },

  async listAchievements(_req: Request, res: Response) {
    try {
      const achievements = await AchievementModel.getAllAchievements();
      res.json(achievements);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve achievements' });
    }
  },

  async assignToUser(req: Request, res: Response) {
    try {
      const { user_id, achievement_id } = req.body;
      await AchievementModel.assignAchievement({ id: uuid(), user_id, achievement_id });
      res.status(201).json({ message: 'Achievement assigned to user' });
    } catch {
      res.status(500).json({ error: 'Failed to assign achievement' });
    }
  },

  async getUserAchievements(req: Request, res: Response) {
    try {
      const achievements = await AchievementModel.getUserAchievements(req.params.user_id);
      res.json(achievements);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve user achievements' });
    }
  }
};

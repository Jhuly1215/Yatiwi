import { Request, Response } from 'express';
import { QuestionModel } from '../models/questionModel';

export const QuestionController = {
  async addQuestion(req: Request, res: Response) {
    try {
      const id = await QuestionModel.addQuestion(req.body);
      res.status(201).json({ message: 'Question created', id });
    } catch {
      res.status(500).json({ error: 'Failed to create question' });
    }
  },

  async getQuestionsByLesson(req: Request, res: Response) {
    try {
      const questions = await QuestionModel.getQuestionsByLesson(req.params.lesson_id);
      res.json(questions);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve questions' });
    }
  }
};

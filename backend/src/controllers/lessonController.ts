import { Request, Response } from 'express';
import { LessonModel } from '../models/lessonModel';
import { v4 as uuid } from 'uuid';

export const LessonController = {
  async createLesson(req: Request, res: Response) {
    try {
      const { title, description, subject_id, tags, level, author_id } = req.body;
      const newLesson = { id: uuid(), title, description, subject_id, tags, level, author_id };
      await LessonModel.createLesson(newLesson);
      res.status(201).json({ message: "Lesson created", lesson: newLesson });
    } catch {
      res.status(500).json({ error: "Failed to create lesson" });
    }
  },

  async getLesson(req: Request, res: Response) {
    try {
      const lesson = await LessonModel.getLessonById(req.params.id);
      lesson ? res.json(lesson) : res.status(404).json({ error: "Lesson not found" });
    } catch {
      res.status(500).json({ error: "Failed to get lesson" });
    }
  },

  async getLessonsBySubject(req: Request, res: Response) {
    try {
      const lessons = await LessonModel.getLessonsBySubject(req.params.subject_id);
      res.json(lessons);
    } catch {
      res.status(500).json({ error: "Failed to get lessons" });
    }
  }
};

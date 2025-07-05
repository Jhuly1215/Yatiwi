import { Request, Response } from 'express';
import { SubjectModel } from '../models/subjectModel';
import { v4 as uuid } from 'uuid';

export const SubjectController = {
  async createSubject(req: Request, res: Response) {
    try {
      const { name, translations, icon_url } = req.body;
      const newSubject = { id: uuid(), name, translations, icon_url };
      await SubjectModel.createSubject(newSubject);
      res.status(201).json({ message: "Subject created", subject: newSubject });
    } catch (error) {
      res.status(500).json({ error: "Failed to create subject" });
    }
  },

  async getSubject(req: Request, res: Response) {
    try {
      const subject = await SubjectModel.getSubjectById(req.params.id);
      subject ? res.json(subject) : res.status(404).json({ error: "Subject not found" });
    } catch {
      res.status(500).json({ error: "Failed to get subject" });
    }
  },

  async getAllSubjects(_req: Request, res: Response) {
    try {
      const subjects = await SubjectModel.getAllSubjects();
      res.json(subjects);
    } catch {
      res.status(500).json({ error: "Failed to get subjects" });
    }
  }
};

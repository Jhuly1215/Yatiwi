import { Request, Response } from 'express';
import { MaterialModel } from '../models/materialModel';
import { v4 as uuid } from 'uuid';

export const MaterialController = {
  async createMaterial(req: Request, res: Response) {
    try {
      const {
        lesson_id, type, language, url, format,
        size, version, order, checksum
      } = req.body;

      const newMaterial = {
        id: uuid(),
        lesson_id,
        type,
        language,
        url,
        format,
        size,
        version,
        order,
        checksum
      };

      await MaterialModel.createMaterial(newMaterial);
      res.status(201).json({ message: 'Material created', material: newMaterial });
    } catch {
      res.status(500).json({ error: 'Failed to create material' });
    }
  },

  async getMaterialsByLesson(req: Request, res: Response) {
    try {
      const lessonId = req.params.lesson_id;
      const materials = await MaterialModel.getMaterialsByLesson(lessonId);
      res.json(materials);
    } catch {
      res.status(500).json({ error: 'Failed to retrieve materials' });
    }
  },

  async deleteMaterial(req: Request, res: Response) {
    try {
      await MaterialModel.deleteMaterial(req.params.id);
      res.json({ message: 'Material deleted' });
    } catch {
      res.status(500).json({ error: 'Failed to delete material' });
    }
  }
};

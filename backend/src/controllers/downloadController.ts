import { Request, Response } from 'express';
import { DownloadModel } from '../models/downloadModel';
import { v4 as uuid } from 'uuid';

export const DownloadController = {
  async createDownload(req: Request, res: Response) {
    try {
      const { user_id, material_id, version, local_path } = req.body;
      const newDownload = { id: uuid(), user_id, material_id, version, local_path };
      await DownloadModel.createDownload(newDownload);
      res.status(201).json({ message: "Download registered", download: newDownload });
    } catch {
      res.status(500).json({ error: "Failed to register download" });
    }
  },

  async getUserDownloads(req: Request, res: Response) {
    try {
      const downloads = await DownloadModel.getDownloadsByUser(req.params.user_id);
      res.json(downloads);
    } catch {
      res.status(500).json({ error: "Failed to retrieve downloads" });
    }
  },

  async deleteDownload(req: Request, res: Response) {
    try {
      await DownloadModel.deleteDownload(req.params.id);
      res.json({ message: "Download deleted" });
    } catch {
      res.status(500).json({ error: "Failed to delete download" });
    }
  }
};

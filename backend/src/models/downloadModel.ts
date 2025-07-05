import { getDB } from '../utils/db';
import { Download, DownloadCreate } from '../types/downloadTypes';

export const DownloadModel = {
  async createDownload(download: DownloadCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO downloads (id, user_id, material_id, version, local_path)
      VALUES (?, ?, ?, ?, ?)`,
      download.id, download.user_id, download.material_id, download.version, download.local_path
    );
  },

  async getDownloadsByUser(user_id: string): Promise<Download[]> {
    const db = await getDB();
    return db.all<Download[]>(`SELECT * FROM downloads WHERE user_id = ?`, user_id);
  },

  async deleteDownload(id: string): Promise<void> {
    const db = await getDB();
    await db.run(`DELETE FROM downloads WHERE id = ?`, id);
  }
};

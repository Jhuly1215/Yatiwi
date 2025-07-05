import { getDB } from '../utils/db';
import { Material, MaterialCreate } from '../types/materialTypes';

export const MaterialModel = {
  async createMaterial(material: MaterialCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO materials 
      (id, lesson_id, type, language, url, format, size, version, "order", checksum)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      material.id,
      material.lesson_id,
      material.type,
      material.language,
      material.url,
      material.format,
      material.size,
      material.version,
      material.order,
      material.checksum
    );
  },

  async getMaterialsByLesson(lesson_id: string): Promise<Material[]> {
    const db = await getDB();
    return db.all<Material[]>('SELECT * FROM materials WHERE lesson_id = ?', lesson_id);
  },

  async deleteMaterial(id: string): Promise<void> {
    const db = await getDB();
    await db.run('DELETE FROM materials WHERE id = ?', id);
  }
};

import { getDB } from '../utils/db';
import { Subject, SubjectCreate } from '../types/subjectTypes';

export const SubjectModel = {
  async createSubject(subject: SubjectCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO subjects (id, name, translations, icon_url)
      VALUES (?, ?, ?, ?)`,
      subject.id,
      subject.name,
      JSON.stringify(subject.translations),
      subject.icon_url || null
    );
  },

  async getSubjectById(id: string): Promise<Subject | undefined> {
    const db = await getDB();
    const subject = await db.get<Subject>('SELECT * FROM subjects WHERE id = ?', id);
    if (subject) subject.translations = JSON.parse(subject.translations as unknown as string);
    return subject;
  },

  async getAllSubjects(): Promise<Subject[]> {
    const db = await getDB();
    const subjects = await db.all<Subject[]>('SELECT * FROM subjects');
    return subjects.map(subj => ({ ...subj, translations: JSON.parse(subj.translations as unknown as string) }));
  },

  async deleteSubject(id: string): Promise<void> {
    const db = await getDB();
    await db.run('DELETE FROM subjects WHERE id = ?', id);
  }
};

import { getDB } from '../utils/db';
import { Lesson, LessonCreate } from '../types/lessonTypes';

export const LessonModel = {
  async createLesson(lesson: LessonCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO lessons (id, title, description, subject_id, tags, level, author_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      lesson.id,
      JSON.stringify(lesson.title),
      JSON.stringify(lesson.description),
      lesson.subject_id,
      JSON.stringify(lesson.tags),
      lesson.level,
      lesson.author_id
    );
  },

  async getLessonById(id: string): Promise<Lesson | undefined> {
    const db = await getDB();
    const lesson = await db.get<Lesson>('SELECT * FROM lessons WHERE id = ?', id);
    if (lesson) {
      lesson.title = JSON.parse(lesson.title as unknown as string);
      lesson.description = JSON.parse(lesson.description as unknown as string);
      lesson.tags = JSON.parse(lesson.tags as unknown as string);
    }
    return lesson;
  },

  async getLessonsBySubject(subject_id: string): Promise<Lesson[]> {
    const db = await getDB();
    const lessons = await db.all<Lesson[]>('SELECT * FROM lessons WHERE subject_id = ?', subject_id);
    return lessons.map(lesson => ({
      ...lesson,
      title: JSON.parse(lesson.title as unknown as string),
      description: JSON.parse(lesson.description as unknown as string),
      tags: JSON.parse(lesson.tags as unknown as string)
    }));
  },

  async deleteLesson(id: string): Promise<void> {
    const db = await getDB();
    await db.run('DELETE FROM lessons WHERE id = ?', id);
  }
};

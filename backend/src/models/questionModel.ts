import { getDB } from '../utils/db';
import { TestQuestion, TestQuestionCreate } from '../types/questionTypes';
import { v4 as uuid } from 'uuid';

export const QuestionModel = {
  async addQuestion(data: TestQuestionCreate): Promise<string> {
    const db = await getDB();
    const id = uuid();
    await db.run(`
      INSERT INTO test_questions (id, lesson_id, text, type, options, "order")
      VALUES (?, ?, ?, ?, ?, ?)`,
      id,
      data.lesson_id,
      JSON.stringify(data.text),
      data.type,
      JSON.stringify(data.options),
      data.order
    );
    return id;
  },

  async getQuestionsByLesson(lesson_id: string): Promise<TestQuestion[]> {
    const db = await getDB();
    const raw = await db.all<TestQuestion[]>('SELECT * FROM test_questions WHERE lesson_id = ? ORDER BY "order"', lesson_id);
    return raw.map(q => ({
      ...q,
      text: JSON.parse(q.text as unknown as string),
      options: JSON.parse(q.options as unknown as string)
    }));
  }
};

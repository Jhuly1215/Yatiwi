// src/database/lessonProgress.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface LessonProgressRow {
  id: string;
  user_id: string;
  lesson_id: string;
  status: string;
  progress_percent: number;
  last_accessed?: string;
  score?: number;
}

export function getLessonProgress(userId: string): Promise<LessonProgressRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM lesson_progress WHERE user_id=?;`,
        [userId],
        (_, { rows }) => {
          const out: LessonProgressRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function upsertLessonProgress(data: LessonProgressRow): Promise<void> {
  // si existe, actualiza, si no, inserta
  return getLessonProgress(data.user_id).then(list => {
    const exists = list.find(r => r.lesson_id === data.lesson_id);
    if (exists) {
      return new Promise((res, rej) => {
        db.transaction(tx =>
          tx.executeSql(
            `UPDATE lesson_progress SET
              status=?,progress_percent=?,last_accessed=?,score=?
             WHERE id=?;`,
            [data.status,data.progress_percent,data.last_accessed,data.score,data.id],
            () => res(),
            (_, e) => { rej(e); return false;}
          )
        );
      });
    } else {
      const id = uuidv4();
      data.id = id;
      data.last_accessed = data.last_accessed ?? new Date().toISOString();
      return new Promise((res, rej) => {
        db.transaction(tx =>
          tx.executeSql(
            `INSERT INTO lesson_progress
             (id,user_id,lesson_id,status,progress_percent,last_accessed,score)
             VALUES (?,?,?,?,?,?,?);`,
            [data.id,data.user_id,data.lesson_id,data.status,data.progress_percent,data.last_accessed,data.score],
            () => res(),
            (_, e) => { rej(e); return false;}
          )
        );
      });
    }
  });
}

export function deleteLessonProgress(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM lesson_progress WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}

// src/database/progress.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface ProgressRow {
  id: string;
  user_id: string;
  date: string;
  time_spent: number;
  lessons_completed: number;
  points_earned: number;
  current_streak: number;
}

export function getProgress(userId: string): Promise<ProgressRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM progress WHERE user_id=?;`,
        [userId],
        (_, { rows }) => {
          const out: ProgressRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function insertProgress(data: Omit<ProgressRow,'id'>): Promise<string> {
  const id = uuidv4();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO progress
         (id,user_id,date,time_spent,lessons_completed,points_earned,current_streak)
         VALUES (?,?,?,?,?,?,?);`,
        [id,data.user_id,data.date,data.time_spent,data.lessons_completed,data.points_earned,data.current_streak],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function updateProgress(id: string, data: Partial<Omit<ProgressRow,'id'>>): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE progress SET
          date=?,time_spent=?,lessons_completed=?,points_earned=?,current_streak=?
         WHERE id=?;`,
        [data.date,data.time_spent,data.lessons_completed,data.points_earned,data.current_streak,id],
        () => res(),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteProgress(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM progress WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}

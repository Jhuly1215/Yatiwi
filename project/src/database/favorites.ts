// src/database/favorites.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface FavoriteRow {
  id: string;
  user_id: string;
  lesson_id: string;
  added_at: string;
}

export function getFavorites(userId: string): Promise<FavoriteRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM favorites WHERE user_id=?;`,
        [userId],
        (_, { rows }) => {
          const out: FavoriteRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function insertFavorite(userId: string, lessonId: string): Promise<string> {
  const id = uuidv4(), added_at=new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO favorites (id,user_id,lesson_id,added_at) VALUES (?,?,?,?);`,
        [id,userId,lessonId,added_at],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteFavorite(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `DELETE FROM favorites WHERE id=?;`,
        [id],
        () => res(),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

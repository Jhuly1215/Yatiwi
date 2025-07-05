// src/database/achievements.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface AchievementRow {
  id: string;
  code: string;
  title: Record<string,string>;
  description: Record<string,string>;
  icon_url?: string;
  points: number;
  created_at: string;
  updated_at: string;
}

const toJson = (o: any) => JSON.stringify(o);

export function getAllAchievements(): Promise<AchievementRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM achievements;`,
        [],
        (_, { rows }) => {
          const out: AchievementRow[] = [];
          for (let i=0;i<rows.length;i++){
            const r = rows.item(i);
            out.push({
              ...r,
              title: JSON.parse(r.title),
              description: JSON.parse(r.description)
            });
          }
          res(out);
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function insertAchievement(data: Omit<AchievementRow,'id'>): Promise<string> {
  const id = uuidv4(), now=new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO achievements (id,code,title,description,icon_url,points,created_at,updated_at)
         VALUES (?,?,?,?,?,?,?,?);`,
        [
          id,data.code,toJson(data.title),toJson(data.description),
          data.icon_url ?? null,data.points,now,now
        ],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function updateAchievement(id: string, data: Partial<Omit<AchievementRow,'id'|'created_at'>>): Promise<void> {
  const now=new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE achievements SET code=?,title=?,description=?,icon_url=?,points=?,updated_at=? WHERE id=?;`,
        [
          data.code,data.title && toJson(data.title),data.description && toJson(data.description),
          data.icon_url ?? null,data.points,now,id
        ],
        () => res(),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteAchievement(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM achievements WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}

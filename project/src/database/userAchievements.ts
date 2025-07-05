// src/database/userAchievements.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface UserAchievementRow {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
}

export function getUserAchievements(userId: string): Promise<UserAchievementRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM user_achievements WHERE user_id=?;`,
        [userId],
        (_, { rows }) => {
          const out: UserAchievementRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function insertUserAchievement(userId: string, achievementId: string): Promise<string> {
  const id = uuidv4(), earned_at=new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO user_achievements (id,user_id,achievement_id,earned_at)
         VALUES (?,?,?,?);`,
        [id,userId,achievementId,earned_at],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteUserAchievement(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM user_achievements WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}

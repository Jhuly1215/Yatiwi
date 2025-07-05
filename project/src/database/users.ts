// src/database/users.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface UserRow {
  id: string;
  email: string;
  hashed_password: string;
  type: 'student' | 'teacher';
  name?: string;
  selected_language: string;
  profile_image_url?: string;
  settings: Record<string, any>;
  created_at: string;
  last_login?: string;
}

const toJson = (o: any) => JSON.stringify(o || {});

export function getAllUsers(): Promise<UserRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM users;`,
        [],
        (_, { rows }) => {
          const out: UserRow[] = [];
          for (let i = 0; i < rows.length; i++) {
            const r = rows.item(i);
            out.push({
              ...r,
              settings: JSON.parse(r.settings)
            });
          }
          res(out);
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function getUserById(id: string): Promise<UserRow | null> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM users WHERE id = ?;`,
        [id],
        (_, { rows }) => {
          if (rows.length === 0) return res(null);
          const r = rows.item(0);
          res({ ...r, settings: JSON.parse(r.settings) });
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function insertUser(data: Omit<UserRow, 'id' | 'created_at'>): Promise<string> {
  const id = uuidv4(), now = new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO users
         (id,email,hashed_password,type,name,selected_language,profile_image_url,settings,created_at,last_login)
         VALUES (?,?,?,?,?,?,?,?,?,?);`,
        [
          id,
          data.email,
          data.hashed_password,
          data.type,
          data.name ?? null,
          data.selected_language,
          data.profile_image_url ?? null,
          toJson(data.settings),
          now,
          data.last_login ?? null
        ],
        () => res(id),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function updateUser(id: string, data: Partial<Omit<UserRow, 'id' | 'created_at'>>): Promise<void> {
  const now = new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE users SET
           email=?,hashed_password=?,type=?,name=?,selected_language=?,
           profile_image_url=?,settings=?,last_login=?
         WHERE id=?;`,
        [
          data.email,
          data.hashed_password,
          data.type,
          data.name ?? null,
          data.selected_language,
          data.profile_image_url ?? null,
          toJson(data.settings),
          data.last_login ?? now,
          id
        ],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function deleteUser(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `DELETE FROM users WHERE id = ?;`,
        [id],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

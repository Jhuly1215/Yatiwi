// src/database/subjects.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface SubjectRow {
  id: string;
  name: string;
  translations: Record<string, string>;
  icon_url?: string;
}

const toJson = (o: any) => JSON.stringify(o || {});

export function getAllSubjects(): Promise<SubjectRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM subjects;`,
        [],
        (_, { rows }) => {
          const out: SubjectRow[] = [];
          for (let i=0;i<rows.length;i++) {
            const r = rows.item(i);
            out.push({ ...r, translations: JSON.parse(r.translations) });
          }
          res(out);
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function getSubjectById(id: string): Promise<SubjectRow | null> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM subjects WHERE id = ?;`,
        [id],
        (_, { rows }) => {
          if (rows.length===0) return res(null);
          const r = rows.item(0);
          res({ ...r, translations: JSON.parse(r.translations) });
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function insertSubject(data: Omit<SubjectRow,'id'>): Promise<string> {
  const id = uuidv4();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO subjects (id,name,translations,icon_url) VALUES (?,?,?,?);`,
        [id, data.name, toJson(data.translations), data.icon_url ?? null],
        () => res(id),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function updateSubject(id: string, data: Partial<Omit<SubjectRow,'id'>>): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE subjects SET name=?,translations=?,icon_url=? WHERE id=?;`,
        [data.name, toJson(data.translations), data.icon_url ?? null, id],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function deleteSubject(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `DELETE FROM subjects WHERE id = ?;`,
        [id],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

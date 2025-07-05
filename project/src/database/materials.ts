// src/database/materials.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface MaterialRow {
  id: string;
  lesson_id: string;
  type: string;
  language: string;
  url: string;
  format: string;
  size?: number;
  version: number;
  order_no: number;
  checksum?: string;
  created_at: string;
}

export function getMaterialsByLesson(lessonId: string): Promise<MaterialRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM materials WHERE lesson_id = ?;`,
        [lessonId],
        (_, { rows }) => {
          const out: MaterialRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function insertMaterial(data: Omit<MaterialRow,'id'|'version'|'created_at'>): Promise<string> {
  const id = uuidv4(), now=new Date().toISOString(), version=data.version ?? 1;
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO materials
         (id,lesson_id,type,language,url,format,size,version,order_no,checksum,created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?);`,
        [
          id, data.lesson_id, data.type, data.language,
          data.url, data.format, data.size ?? null,
          version, data.order_no, data.checksum ?? null, now
        ],
        () => res(id),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function updateMaterial(id: string, data: Partial<Omit<MaterialRow,'id'|'created_at'>>): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `UPDATE materials SET
          type=?,language=?,url=?,format=?,size=?,version=?,order_no=?,checksum=?
         WHERE id=?;`,
        [
          data.type, data.language, data.url, data.format,
          data.size ?? null, data.version, data.order_no, data.checksum ?? null, id
        ],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

export function deleteMaterial(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `DELETE FROM materials WHERE id = ?;`,
        [id],
        () => res(),
        (_, e) => { rej(e); return false; }
      )
    );
  });
}

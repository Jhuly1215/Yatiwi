// src/database/downloads.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface DownloadRow {
  id: string;
  user_id: string;
  material_id: string;
  version: number;
  local_path: string;
  downloaded_at: string;
}

export function getDownloads(userId: string): Promise<DownloadRow[]> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `SELECT * FROM downloads WHERE user_id=?;`,
        [userId],
        (_, { rows }) => {
          const out: DownloadRow[] = [];
          for (let i=0;i<rows.length;i++) out.push(rows.item(i));
          res(out);
        },
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function insertDownload(data: Omit<DownloadRow,'id'|'downloaded_at'>): Promise<string> {
  const id = uuidv4(), downloaded_at=new Date().toISOString();
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(
        `INSERT INTO downloads (id,user_id,material_id,version,local_path,downloaded_at)
         VALUES (?,?,?,?,?,?);`,
        [id,data.user_id,data.material_id,data.version,data.local_path,downloaded_at],
        () => res(id),
        (_, e) => { rej(e); return false;}
      )
    );
  });
}

export function deleteDownload(id: string): Promise<void> {
  return new Promise((res, rej) => {
    db.transaction(tx =>
      tx.executeSql(`DELETE FROM downloads WHERE id=?;`,[id],
        () => res(), (_, e) => { rej(e); return false;}
      )
    );
  });
}

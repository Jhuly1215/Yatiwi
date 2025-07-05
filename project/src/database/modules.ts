// File: src/database/modules.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

export interface ModuleRow {
  id: string;
  title: string;
  subject_id: string;
  created_at: string;
  updated_at: string;
}

// Obtener todos los módulos de un subject
export function getModulesBySubject(subjectId: string): Promise<ModuleRow[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM modules WHERE subject_id = ?;`,
        [subjectId],
        (_, result) => {
          const out: ModuleRow[] = [];
          for (let i = 0; i < result.rows.length; i++) {
            out.push(result.rows.item(i));
          }
          resolve(out);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Obtener un módulo por ID
export function getModuleById(id: string): Promise<ModuleRow | null> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM modules WHERE id = ?;`,
        [id],
        (_, result) => {
          if (result.rows.length === 0) {
            resolve(null);
          } else {
            resolve(result.rows.item(0));
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Insertar un nuevo módulo
export function insertModule(data: Omit<ModuleRow, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  const id = uuidv4();
  const now = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO modules (id, title, subject_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?);`,
        [id, data.title, data.subject_id, now, now],
        () => resolve(id),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Actualizar un módulo existente
export function updateModule(id: string, data: Partial<Omit<ModuleRow, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
  const now = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE modules
         SET title = ?, subject_id = ?, updated_at = ?
         WHERE id = ?;`,
        [data.title, data.subject_id, now, id],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Eliminar un módulo
export function deleteModule(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM modules WHERE id = ?;`,
        [id],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

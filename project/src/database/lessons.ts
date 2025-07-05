// src/database/lessons.ts

import db from './index';
import { v4 as uuidv4 } from 'uuid';

// Interfaz que representa una fila de la tabla lessons
export interface LessonRow {
  id: string;
  title: Record<string, string>;
  description?: Record<string, string>;
  subject_id: string;
  tags?: string[];
  level?: string;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

// Asegúrate de llamar initDB() (desde index.ts) al arrancar tu app

// Helpers para serializar y deserializar JSON
const toJson = (obj: any) => JSON.stringify(obj || {});
const fromJson = (str: string) => {
  try { return JSON.parse(str); }
  catch { return undefined; }
};

// Obtener todas las lecciones
export function getAllLessons(): Promise<LessonRow[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM lessons;`,
        [],
        (_, { rows }) => {
          const items: LessonRow[] = [];
          for (let i = 0; i < rows.length; i++) {
            const r = rows.item(i);
            items.push({
              id: r.id,
              title: fromJson(r.title),
              description: fromJson(r.description),
              subject_id: r.subject_id,
              tags: fromJson(r.tags),
              level: r.level,
              author_id: r.author_id,
              created_at: r.created_at,
              updated_at: r.updated_at,
            });
          }
          resolve(items);
        },
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

// Obtener lecciones por subject
export function getLessonsBySubject(subjectId: string): Promise<LessonRow[]> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM lessons WHERE subject_id = ?;`,
        [subjectId],
        (_, { rows }) => {
          const items: LessonRow[] = [];
          for (let i = 0; i < rows.length; i++) {
            const r = rows.item(i);
            items.push({
              id: r.id,
              title: fromJson(r.title),
              description: fromJson(r.description),
              subject_id: r.subject_id,
              tags: fromJson(r.tags),
              level: r.level,
              author_id: r.author_id,
              created_at: r.created_at,
              updated_at: r.updated_at,
            });
          }
          resolve(items);
        },
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

// Obtener una lección por ID
export function getLessonById(id: string): Promise<LessonRow | null> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM lessons WHERE id = ?;`,
        [id],
        (_, { rows }) => {
          if (rows.length === 0) {
            resolve(null);
          } else {
            const r = rows.item(0);
            resolve({
              id: r.id,
              title: fromJson(r.title),
              description: fromJson(r.description),
              subject_id: r.subject_id,
              tags: fromJson(r.tags),
              level: r.level,
              author_id: r.author_id,
              created_at: r.created_at,
              updated_at: r.updated_at,
            });
          }
        },
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

// Insertar una nueva lección
export function insertLesson(data: Omit<Partial<LessonRow>, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  const id = uuidv4();
  const now = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO lessons
          (id, title, description, subject_id, tags, level, author_id, created_at, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?);`,
        [
          id,
          toJson(data.title),
          toJson(data.description),
          data.subject_id,
          toJson(data.tags),
          data.level,
          data.author_id,
          now,
          now
        ],
        () => resolve(id),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

// Actualizar una lección existente
export function updateLesson(id: string, data: Partial<Omit<LessonRow, 'id' | 'created_at' | 'updated_at'>>): Promise<void> {
  const now = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE lessons SET
          title = ?, description = ?, subject_id = ?, tags = ?, level = ?, author_id = ?, updated_at = ?
         WHERE id = ?;`,
        [
          toJson(data.title),
          toJson(data.description),
          data.subject_id,
          toJson(data.tags),
          data.level,
          data.author_id,
          now,
          id
        ],
        () => resolve(),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

// Eliminar una lección
export function deleteLesson(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM lessons WHERE id = ?;`,
        [id],
        () => resolve(),
        (_, err) => { reject(err); return false; }
      );
    });
  });
}

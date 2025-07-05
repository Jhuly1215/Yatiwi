// File: src/database/index.ts

import * as SQLite from 'expo-sqlite';

// Abrimos (o creamos) la base de datos local
const db = SQLite.openDatabase('app.db');

/**
 * Inicializa todas las tablas de la base de datos.
 * Debe llamarse una sola vez, al arrancar la aplicación.
 */
export function initDB(): void {
  db.transaction(tx => {
    // Tabla users
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'student',
        name TEXT,
        selected_language TEXT NOT NULL DEFAULT 'es',
        profile_image_url TEXT,
        settings TEXT NOT NULL DEFAULT '{}',
        created_at TEXT NOT NULL,
        last_login TEXT
      );
    `);

    // Tabla subjects
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS subjects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        translations TEXT NOT NULL DEFAULT '{}',
        icon_url TEXT
      );
    `);

    // Tabla lessons
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS lessons (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        subject_id TEXT NOT NULL,
        tags TEXT,
        level TEXT,
        author_id TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
        FOREIGN KEY(author_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    // Tabla materials
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS materials (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        type TEXT NOT NULL,
        language TEXT NOT NULL,
        url TEXT NOT NULL,
        format TEXT NOT NULL,
        size INTEGER,
        version INTEGER NOT NULL DEFAULT 1,
        order_no INTEGER NOT NULL DEFAULT 0,
        checksum TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      );
    `);

    // Tabla favorites
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS favorites (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        lesson_id TEXT NOT NULL,
        added_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      );
    `);

    // Tabla downloads
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS downloads (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        material_id TEXT NOT NULL,
        version INTEGER NOT NULL,
        local_path TEXT NOT NULL,
        downloaded_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Tabla progress
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS progress (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        time_spent INTEGER DEFAULT 0,
        lessons_completed INTEGER DEFAULT 0,
        points_earned INTEGER DEFAULT 0,
        current_streak INTEGER DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Tabla lesson_progress
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS lesson_progress (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        lesson_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'not_started',
        progress_percent INTEGER NOT NULL DEFAULT 0,
        last_accessed TEXT,
        score INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      );
    `);

    // Tabla test_questions
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS test_questions (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        options TEXT,
        order_no INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY(lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
      );
    `);

    // Tabla achievements
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS achievements (
        id TEXT PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_url TEXT,
        points INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // Tabla user_achievements
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        achievement_id TEXT NOT NULL,
        earned_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
      );
    `);
  },
  error => {
    console.error('Error initializing database:', error);
  },
  () => {
    console.log('Database initialized successfully');
  });
}

export default db;

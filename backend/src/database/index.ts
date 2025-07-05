// backend/src/database/index.ts
import { readFileSync } from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initDB() {
  try {
    const db = await open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });

    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');
    await db.exec(schema);

    console.log('✅ Base de datos inicializada correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

initDB();

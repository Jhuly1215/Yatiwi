import { readFileSync } from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');
  await db.exec(schema);

  console.log('✅ Base de datos inicializada correctamente.');
  return db;
};

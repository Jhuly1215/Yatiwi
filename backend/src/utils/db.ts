// backend/src/utils/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const getDB = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
};

import { readFileSync } from 'fs';
import { getDB } from '../utils/db';

export const initDB = async () => {
  const db = await getDB();
  const schema = readFileSync('./src/database/schema.sql', 'utf-8');
  await db.exec(schema);
  console.log('✅ Database initialized successfully!');
};

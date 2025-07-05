import { getDB } from '../utils/db';
import { User, UserCreate } from '../types/userTypes';

export const UserModel = {
  async createUser(user: UserCreate): Promise<void> {
    const db = await getDB();
    await db.run(`
      INSERT INTO users (id, email, hashed_password, type, name, selected_language) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      user.id,
      user.email,
      user.hashed_password,
      user.type,
      user.name,
      user.selected_language
    );
  },

  async getUserById(id: string): Promise<User | undefined> {
    const db = await getDB();
    return db.get<User>('SELECT * FROM users WHERE id = ?', id);
  },

  async getAllUsers(): Promise<User[]> {
    const db = await getDB();
    return db.all<User[]>('SELECT * FROM users');
  },

  async updateLastLogin(id: string): Promise<void> {
    const db = await getDB();
    await db.run(`
      UPDATE users SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ?`, id);
  },

  async deleteUser(id: string): Promise<void> {
    const db = await getDB();
    await db.run(`DELETE FROM users WHERE id = ?`, id);
  }
};

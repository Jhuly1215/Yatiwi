import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { v4 as uuid } from 'uuid';

export const UserController = {
  async createUser(req: Request, res: Response) {
    try {
      const { email, hashed_password, type, name, selected_language } = req.body;
      const newUser = {
        id: uuid(),
        email,
        hashed_password,
        type,
        name,
        selected_language,
      };
      await UserModel.createUser(newUser);
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  async getUser(req: Request, res: Response) {
    try {
      const user = await UserModel.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  },

  async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to get users" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      await UserModel.deleteUser(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
};

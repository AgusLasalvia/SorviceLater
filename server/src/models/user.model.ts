import { Database } from "../database";

export interface User {
  _id: string;
  username: string
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {

  static async register(user: User): Promise<User> {
    return user;
  }

  static async login(email: string, password: string): Promise<User | null> {
    const db = await Database.getInstance();
    const sql = `SELECT id,username FROM users WHERE email = ? AND password = ?`;
    const [rows] = await db.query<User>(sql, [email, password]);
    return rows.length ? rows[0] : null;
  }

  static async getUsers(): Promise<User[] | null> {
    const db = await Database.getInstance();
    const sql = `SELECT id,username FROM users`;
    const [rows] = await db.query<User>(sql);
    return rows;
  }

  static async getUserById(id: string): Promise<User | null> {
    const db = await Database.getInstance();
    const sql = `SELECT id,username FROM users WHERE id = ?`;
    const [rows] = await db.query<User>(sql, [id]);
    return rows.length ? rows[0] : null;
  }

  static async updateUser(id: string, user: User): Promise<User | null> {
    const db = await Database.getInstance();
    const sql = `UPDATE users SET username = ? WHERE id = ?`;
    const [result] = await db.query(sql, [user.firstName, id]);
    return result ? user : null;
  }

  static async deleteUser(id: string): Promise<boolean> {
    const db = await Database.getInstance();
    const sql = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.query(sql, [id]);
    return result ? true : false;
  }

  static async AddUser(user: User): Promise<User | null> {
    const db = await Database.getInstance();
    const sql = `INSERT INTO User (username,firstName,lastName,email,password,createdAt,updatedAt) VALUES (?,?,?,?,?,?)`;
    const [result] = await db.query(sql, [user.username, user.firstName, user.lastName, user.email, user.password, new Date(), new Date()]);
    return result ? user : null;
  }
}

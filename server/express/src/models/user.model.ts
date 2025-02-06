import { Database } from "../database";

export interface User {
	id: number;
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

	static async login(username: string, password: string): Promise<User | null> {
		const db = await Database.getInstance();
		const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
		const [rows] = await db.query<User>(sql, [username, password]);
		console.log(rows)
		return rows.length ? rows[0] : null;
	}

	static async getUsers(): Promise<User[] | []> {
		const db = await Database.getInstance();
		const sql = `SELECT id,username FROM user;`;
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
		const [rows] = await db.query(sql, [user.firstName, id]);
		return rows ? user : null;
	}

	static async deleteUser(id: string): Promise<boolean> {
		const db = await Database.getInstance();
		const sql = `DELETE FROM users WHERE id = ?`;
		const [rows] = await db.query(sql, [id]);
		return rows ? true : false;
	}

	static async AddUser(user: User): Promise<User | null> {
		const db = await Database.getInstance();
		const sql = `INSERT INTO User (username,firstName,lastName,email,password,createdAt,updatedAt) VALUES (?,?,?,?,?,?)`;
		const [rows] = await db.query(sql, [user.username, user.firstName, user.lastName, user.email, user.password, new Date(), new Date()]);
		return rows ? user : null;
	}
}




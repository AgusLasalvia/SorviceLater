import mysql from 'mysql2/promise';
import { DatabaseSettings } from './lib/settings';
import { User } from './models/user.model';

export class Database {
	private static instance: Database;
	private connection: mysql.Connection;

	private constructor(connection: mysql.Connection) {
		this.connection = connection;
	}

	public static async getInstance(): Promise<Database> {
		if (!Database.instance) {
			const connection = await mysql.createConnection({
				host: DatabaseSettings.host,
				port: DatabaseSettings.port,
				user: DatabaseSettings.user,
				password: DatabaseSettings.password,
				database: DatabaseSettings.database
			});
			Database.instance = new Database(connection);
		}
		return Database.instance;
	}


	private async query(sql: string, values: any[] = []): Promise<any> {
		return await this.connection.query(sql, values);
	}

	// User methods

	public async login(email: string, password: string): Promise<User | null> {
		const [rows] = await this.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
		return rows[0];
	}


	public async getUsers(): Promise<User[] | null> {
		const [rows] = await this.query('SELECT id,username FROM users');
		return rows;
	}

	public async getUserById(id:number):Promise<User | null>{
		const [rows] = await this.query('SELECT id,username FROM users WHERE id = ?', [id]);
		return rows[0];
	}
}

import mysql from 'mysql2/promise';

import { DatabaseSettings } from './lib/settings';



console.log(DatabaseSettings.database as string)
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


	public async query<T = any>(sql: string, values: any[] = []): Promise<[T[], mysql.FieldPacket[]]> {
		return this.connection.query<any>(sql, values);
	}
}
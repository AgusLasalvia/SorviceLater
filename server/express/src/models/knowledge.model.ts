import { Database } from "../database";

export interface Knowledge {
	id: number;
	title: string;
	description: string;
}

export class KnowledgeModel {
	static async createKnowledge(knowledge: Knowledge): Promise<Knowledge | null> {
		const db = await Database.getInstance();
		const sql = `INSERT INTO knowledge (title,description) VALUES(?,?);`
		const [rows] = await db.query(sql, [
			knowledge.title,
			knowledge.description,
		])
		return rows ? knowledge : null;
	}

	static async getAllKnowledge(): Promise<Knowledge[] | []> {
		const db = await Database.getInstance();
		const sql = `SELECT id, title FROM knowledge;`
		const [rows] = await db.query(sql);
		return rows.length > 0 ? rows : [];
	}

	static async getKnowledgeTotalCount(): Promise<any> {
		const db = await Database.getInstance();
		const sql = `SELECT COUNT(id) as count FROM knowledge;`
		const [rows] = await db.query<any>(sql);
		console.log(rows)
		return rows[0].count
	}


	static async getKnowledgeById(id: number): Promise<Knowledge | null> {
		const db = await Database.getInstance();
		const sql = `SELECT * FROM knowledge WHERE id = ${id};`
		const [rows] = await db.query(sql);
		return rows ? rows[0] : null;
	}
}



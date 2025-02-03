import { Database } from "../database";

export interface Knowledge {
	id: string;
	title: string;
	description: string;
}

export class KnowledgeModel {
	static async createKnowledge(knowledge: Knowledge): Promise<Knowledge | null> {
		const db = await Database.getInstance();
		const sql = `INSERT INTO knowledge (title,description) VALUES(?,?);`
		const [result] = await db.query(sql, [
			knowledge.title,
			knowledge.description
		])
		

		return result ? knowledge : null;
	}

	static async getKnowledgeTotalCount(): Promise<any> {
		const db = await Database.getInstance();
		const sql = `SELECT COUNT(id) FROM knowledge;`
		const [result] = await db.query(sql);
		return result ? result : null;
	}
}



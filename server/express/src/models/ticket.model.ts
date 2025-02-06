import { Database } from "../database";

export interface Ticket {
	id: number,
	request_by: string,
	request_for: string,
	service_offering: string,
	item: string,
	contact_type: string,
	status: string,
	assigned: string,
	category: string,
	symptom: string,
	impact: string,
	urgency: string,
	priority: string,
	created_at: Date,
	updated_at: Date
}


export class TicektModel {

	static async createTicket(ticket: Ticket): Promise<Ticket | null> {
		const db = await Database.getInstance();
		const sql = `INSERT INTO ticket (
		request_by,request_for,
		service_offering,item,
		contact_type,status,assigned,
		category,symptom,
		impact,urgency,
		priority ) 
		VALUES  (?,?,?,?,?,?,?,?,?,?,?,?);`;
		const [rows] = await db.query(sql, [
			ticket.request_by,
			ticket.request_for,
			ticket.service_offering,
			ticket.item,
			ticket.contact_type,
			ticket.status,
			ticket.assigned,
			ticket.category,
			ticket.symptom,
			ticket.impact,
			ticket.urgency,
			ticket.priority
		]);
		return rows ? ticket : null;
	}


	static async getTicketById(id: number): Promise<Ticket | null> {
		const db = await Database.getInstance();
		const sql = `SELECT * FROM Ticket WHERE id = ?;`;
		const [rows] = await db.query<Ticket>(sql, [id]);
		return rows.length ? rows[0] : null;
	}


	static async getTicketByUser(username: string): Promise<Ticket[] | null> {
		const db = await Database.getInstance();
		const sql = `SELECT * FROM Ticket WHERE request_by = ?;`;
		const [rows] = await db.query<Ticket>(sql, [username]);
		return rows;
	}


	static async updateTicket(id: number, ticket: Ticket): Promise<Ticket | null> {
		const db = await Database.getInstance();
		const sql = `
		UPDATE Ticket SET 
		request_by = ?, request_for = ?, 
		service_offering = ?,item = ?, 
		contact_type = ?, status = ?, 
		assigned = ?, category = ?, 
		symptom = ?, impact = ?, 
		urgency = ?, priority = ? 
		WHERE id = ?;`;
		const [rows] = await db.query(sql, [
			ticket.request_by,
			ticket.request_for,
			ticket.service_offering,
			ticket.item,
			ticket.contact_type,
			ticket.status,
			ticket.assigned,
			ticket.category,
			ticket.symptom,
			ticket.impact,
			ticket.urgency,
			ticket.priority,
			id
		]);
		return rows ? ticket : null;
	}


	static async getAllTicketCounter() {
		const db = await Database.getInstance()
		const sql = `
		SELECT status, COUNT(*) AS count
		FROM ticket
		WHERE status IN ('new', 'resolved', 'pending')
		GROUP BY status;
		`
		const [rows] = await db.query<any>(sql)

		return rows.length ? rows[0] : null;
	}
}
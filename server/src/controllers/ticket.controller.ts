import { Request, Response } from "express";
import { TicektModel, Ticket } from "../models/ticket.model";


export class TicketController {
	static async createTicket(req: Request, res: Response) {
		const ticket: Ticket = req.body;

		const response: Ticket | null = await TicektModel.createTicket(ticket);
		if (!response)
			res.status(500).json({ message: "Error creating ticket" })
		else
			res.status(200).json({ message: "Ticket created successfully" })
	}

	static async getTicket(req: Request, res: Response) {
		const { id } = req.params;
		const ticket: Ticket | null = await TicektModel.getTicketById(Number(id));

		if (!ticket)
			res.status(404).json({ message: 'Ticket not found' });
		else
			res.status(200).json({ message: "Ticket Found", data: ticket })
	}

	static async updateTicket(req: Request, res: Response) {
		const ticket: Ticket = req.body;
		const response = await TicektModel.updateTicket(ticket._id, ticket);
		if (!response)
			res.status(500).json({ message: 'Error updating the Ticket' });
		else
			res.status(200).json({ message: 'Update Successfull' })
	}


	static async getListOfTicketByUser(req: Request, res: Response) {
		const { user } = req.body;
		const response = await TicektModel.getTicketByUser(user);
		if (!response)
			res.status(404).json({ message: "No ticket found for this user" })
		else
			res.status(200).json({ data: response });

	}

	static async getAllTypeTicketCounter(req: Request, res: Response) {
		const response = await TicektModel.getAllTicketCounter();
		if (!response)
			res.status(404).json({ data: { new: 0, pending: 0, resolved: 0 } })
		else
			res.status(200).json({ data: response });

	}
}
import { Knowledge, KnowledgeModel } from "../models/knowledge.model";
import { Request, Response } from "express";

export class KnowledgeController {

	static async createKnowledge(req: Request, res: Response) {
		const body = req.body;
		const response: Knowledge | null = await KnowledgeModel.createKnowledge(body);
		if (!response)
			res.status(500).json({ message: 'Error Creating the new Knowledge' });
		else
			res.status(200).json({ message: 'Proccess Successfull' })
	}

	static async getKnowledgeTotalCouter(req: Request, res: Response) {
		const response = await KnowledgeModel.getKnowledgeTotalCount();
		res.status(200).json(response);
	}

	static async getAllKnowledge(req: Request, res: Response) {
		const response: Knowledge[] | [] = await KnowledgeModel.getAllKnowledge();
		res.json(response);
	}

	static async getKnowledgeById(req: Request, res: Response) {
		const { id } = req.params
		const response: Knowledge | null = await KnowledgeModel.getKnowledgeById(Number(id));
		if (!response)
			res.status(404)
		else
			res.status(200).json({ data: response })
	}


}
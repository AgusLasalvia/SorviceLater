import { Request, Response } from "express";
import { UserModel } from "../models/user.model";



export default class UserController {
	static async register(req: Request, res: Response) {
		res.send("Register route");
	}

	static async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const user = await UserModel.login(email, password);
		if (user)
			res.json(user);
		else
			res.status(404).json({ message: "User not found" });
	}
	static async getUsers(req: Request, res: Response) {
		const users = await UserModel.getUsers();
		if (!users)
			res.status(404).json({ message: "no users found" });
		else
			res.status(200).json({ data: users })
	}
	static async getUser(req: Request, res: Response) {
		const { id } = req.params;
		const user = await UserModel.getUserById(id);
		if (!user)
			res.status(400).json({ message: "User not found" });
		else
			res.status(200).json({ data: user });
	}
	static async updateUser(req: Request, res: Response) {
		res.send("Update user route");
	}
	static async deleteUser(req: Request, res: Response) {
		res.send("Delete user route");
	}
}
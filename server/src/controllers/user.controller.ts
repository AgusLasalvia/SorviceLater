import { Request,Response } from "express";
import { UserModel } from "../models/user.model";



export default class UserController {
		static async register(req:Request,res:Response){
				res.send("Register route");
		}

		static async login(req:Request,res:Response){
				const { email, password} =  req.body;
				const user = await UserModel.login(email,password);
				if(user)
						res.json(user);
				else
						res.status(404).json({message:"User not found"});
		}
		static async getUsers(req:Request,res:Response){
				const users = await UserModel.getUsers();
		}
		static async getUser(req:Request,res:Response){
				res.send("Get user route");
		}
		static async updateUser(req:Request,res:Response){
				res.send("Update user route");
		}
		static async deleteUser(req:Request,res:Response){
				res.send("Delete user route");
		}
}
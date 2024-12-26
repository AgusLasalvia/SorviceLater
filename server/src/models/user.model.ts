import { Database } from "../database";

export interface User{
	_id:string;
	firstName:string;
	lastName:string;
	email:string;
	password:string;
	createdAt?:Date;
	updatedAt?:Date;
}

export class UserModel{
	static async register(user:User):Promise<User>{
		return user;
	}

	static async login(email:string,password:string):Promise<User | null>{
		return (await Database.getInstance()).login(email,password);
	}

	static async getUsers():Promise<User[] | null>{
		return (await Database.getInstance()).getUsers();
	}
}
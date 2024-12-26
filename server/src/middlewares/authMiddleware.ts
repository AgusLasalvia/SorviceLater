import { Request, Response, NextFunction } from "express";

export const userAuthMiddelware = (req: Request, res: Response, next: NextFunction) => {
	next();
	// Don't  validate nothing for now
}
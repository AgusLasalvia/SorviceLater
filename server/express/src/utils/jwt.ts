import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

// Generar JWT
export const generateToken = (payload: object, expiresIn: string = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verificar JWT
export const verifyToken = (token: string) => {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (error) {
		return null;
	}
};
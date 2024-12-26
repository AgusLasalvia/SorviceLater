import express, { Application } from 'express';
import { config } from 'dotenv';
import cors from 'cors';


// Routes imports
import Auth from "./src/routes/auth.routes";

config();

const app: Application = express();
const PORT = process.env.PORT || 5000;



// Express configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes initialization
app.use('/auth', Auth);


// Server start and port listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
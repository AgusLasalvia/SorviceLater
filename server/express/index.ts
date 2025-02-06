// .env read file
import { config } from 'dotenv';
config();

import express, { Application } from 'express';
import cors from 'cors';

// Routes imports
import AuthRoute from './src/routes/auth.routes';
import UserRoute from './src/routes/user.routes'
import TicketRoute from './src/routes/ticket.routes'
import KnowledgeRoute from './src/routes/knowledge.routes'

const app: Application = express();
const PORT = process.env.SERVER_PORT || 5000;

// Express configuration

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes initialization

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/ticket', TicketRoute);
app.use('/knowledge', KnowledgeRoute);


// Server start and port listening
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

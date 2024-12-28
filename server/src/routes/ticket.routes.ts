import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { userAuthMiddelware } from "../middlewares/authMiddleware";
const router = Router();


router.post('/create', userAuthMiddelware, TicketController.createTicket);

router.post('/update', userAuthMiddelware, TicketController.updateTicket);

router.get('/open', userAuthMiddelware, TicketController.getTicket);

router.get('/list', userAuthMiddelware, TicketController.getListOfTicketByUser);


export default router;
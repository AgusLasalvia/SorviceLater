import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller";
import { userAuthMiddelware } from "../middlewares/authMiddleware";

const router = Router();

// GET requests
router.get('/counters', userAuthMiddelware, TicketController.getAllTypeTicketCounter)

router.get('/open', userAuthMiddelware, TicketController.getTicket);

router.get('/list', userAuthMiddelware, TicketController.getListOfTicketByUser);


// POST requests
router.post('/create', userAuthMiddelware, TicketController.createTicket);

router.post('/update', userAuthMiddelware, TicketController.updateTicket);



export default router;

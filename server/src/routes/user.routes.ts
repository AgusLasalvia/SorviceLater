import { userAuthMiddelware } from "../middlewares/authMiddleware";
import UserController from "../controllers/user.controller";
import { Router } from 'express';

const router = Router();

router.get('/all_users', userAuthMiddelware, UserController.getUsers);


export default router;

import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { userAuthMiddelware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/platform', userAuthMiddelware, UserController.login);

router.get('/platform', (req: any, res: any) => {
	res.send("GET PLATFORM");
});


export default router;
import { Router } from "express";
import { userAuthMiddelware } from "../middlewares/authMiddleware";

const router = Router();

router.post('/count',userAuthMiddelware)

export default router;
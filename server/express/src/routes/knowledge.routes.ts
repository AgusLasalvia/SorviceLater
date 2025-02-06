import { Router } from "express";
import { userAuthMiddelware } from "../middlewares/authMiddleware";
import { KnowledgeController } from "../controllers/knowledge.controller";

const router = Router();

router.get('/count', userAuthMiddelware, KnowledgeController.getKnowledgeTotalCouter)

router.get('/all', userAuthMiddelware, KnowledgeController.getAllKnowledge)

router.post('/new', userAuthMiddelware, KnowledgeController.createKnowledge)



export default router;
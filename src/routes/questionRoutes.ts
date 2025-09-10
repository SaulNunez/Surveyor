import { Router } from 'express';
import { getUserResponseToQuestion, modifyResponseToQuestion, uploadResponse } from '../controllers/questionControllers';

const router: Router = Router();

router.get("/questions/:questionId", getUserResponseToQuestion);
router.post("/questions", uploadResponse);
router.put("/questions/:questionId", modifyResponseToQuestion);

export default router;
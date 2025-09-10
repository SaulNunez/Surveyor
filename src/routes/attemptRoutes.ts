import { Router } from 'express';
import { completeAttempt, createAttempt, deleteAttempt, getAttempt } from '../controllers/attemptController';

const router: Router = Router();

router.get('/attempt', getAttempt);
router.post('/attempt', createAttempt);
router.put('/attempt/:attemptId', completeAttempt);
router.delete('/attempt/:attemptId', deleteAttempt);

export default router;
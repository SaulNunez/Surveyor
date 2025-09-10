import { Router, Request, Response } from 'express';
import { createSurveyForUser, deleteExistingSurvey, editExistingSurvey, getSurveyDetails } from '../controllers/surveyController';

const router: Router = Router();

router.post('/survey', createSurveyForUser);
router.delete('/survey/:surveyId', deleteExistingSurvey);
router.get('/survey/:surveyId', getSurveyDetails);
router.put('/survey/:surveyId', editExistingSurvey)

export default router;
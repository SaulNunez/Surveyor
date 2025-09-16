import { Router } from 'express';
import { createSurveyForUser, deleteExistingSurvey, editExistingSurvey, getSurveyDetails } from '../controllers/surveyController';
import { completeAttempt, createAttempt, deleteAttempt, getAttempt } from '../controllers/attemptController';
import { getUserResponseToQuestion, modifyResponseToQuestion, uploadResponse } from '../controllers/questionControllers';
const passport = require('../config/passport');

const router: Router = Router();

/**
 * @swagger
 * /api/survey
 * post:
 *  summary: Creates a new survey for the authenticated user
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *         required:
 *          - title
 *          - description
 *         properties:
 *           title:
 *             type: string
 *             description: Title of the survey
 *           description:
 *             type: string
 *             description: A text displayed before the questions. This has markdown support for links and formatting.
 *   responses:
 *     201:
 *       description: Created
 */
router.post('/survey', passport.authenticate('bearer', { session: false }), createSurveyForUser);

/**
 * @swagger
 * /api/survey/{surveyId}:
 *   delete:
 *     summary: Edits an existing survey for the authenticated user
 *     parameters:
 *       - name: surveyId
 *         in: path
 *         description: Id of the survey we are deleting
 *         required: true
 *     responses:
 *       201:
 *         description: Deleted
 */
router.delete('/survey/:surveyId', passport.authenticate('bearer', { session: false }), deleteExistingSurvey);

router.get('/survey/:surveyId', getSurveyDetails);
router.put('/survey/:surveyId', passport.authenticate('bearer', { session: false }), editExistingSurvey)

router.get('/attempt', getAttempt);
router.post('/attempt', createAttempt);
router.put('/attempt/:attemptId', completeAttempt);
router.delete('/attempt/:attemptId', deleteAttempt);

router.get("/questions/:questionId", getUserResponseToQuestion);
router.post("/questions", uploadResponse);
router.put("/questions/:questionId", modifyResponseToQuestion);

export default router;
import { Request, Response, NextFunction } from "express";
import { createSurvey, deleteSurvey, editSurvey, getSurvey } from "../services/surveyService";

export const createSurveyForUser = (req: Request, res: Response, next: NextFunction) => {
    const title = req.body["title"];
    const description = req.body["description"];

    const userId = "";

    createSurvey(title, description, userId)
        .then(survey => {
            res.status(201).json(survey);
        })
        .catch(next);
}

export const editExistingSurvey = (req: Request, res: Response, next: NextFunction) => {
    const surveyId = req.params["surveyId"];
    const userId = "";
    
    const title = req.body["title"];
    const description = req.body["description"];

    editSurvey(surveyId, userId, title, description)
        .then(survey => {
            res.status(201).json(survey);
        })
        .catch(next);
}

export const deleteExistingSurvey = (req: Request, res: Response, next: NextFunction) => {
    const surveyId = req.params["surveyId"];

    const userId = "";

    deleteSurvey(surveyId, userId)
        .then(survey => {
            res.status(201).json(survey);
        })
        .catch(next);
}

export const getSurveyDetails = (req: Request, res: Response, next: NextFunction) => {
    const surveyId = req.params["surveyId"];

    getSurvey(surveyId)
    .then(survey => {
            res.status(201).json(survey);
        })
        .catch(next);
}
import { NextFunction, Request, Response } from "express";
import { addResponseToQuestion, getExistingResponseInQuestion, updateResponseToQuestion } from "../services/responseService";

export const uploadResponse = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params["questionId"];
    const attemptId = req.params["attemptId"];

    addResponseToQuestion(attemptId, questionId, req.body)
        .then(updatedAttempt => {
            res.status(201).json({
                message: 'Response added successfully',
                attempt: updatedAttempt
            });
        })
        .catch(next);
};

export const getUserResponseToQuestion = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params["questionId"]
    const attemptId = req.params["attemptId"];

    getExistingResponseInQuestion(attemptId, questionId)
        .then(response => {
            res.status(200).json({
                message: 'Response fetched successfully',
                response: response
            });
        })
        .catch(next);
}

export const modifyResponseToQuestion = (req: Request, res: Response, next: NextFunction) => {
    const questionId = req.params["questionId"]
    const attemptId = req.params["attemptId"];
    
    updateResponseToQuestion(attemptId, questionId, req.body)
        .then(updatedResponse => {
            res.status(200).json({
                message: 'Response updated successfully',
                response: updatedResponse
            });
        })
        .catch(next);
}
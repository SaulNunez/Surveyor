import { Request, Response, NextFunction } from "express";
import { completeExistingAttempt, createNewAttempt, deleteExistingAttempt, getExistingAttempt } from "../services/attemptService";

export const getAttempt = (req: Request, res: Response, next: NextFunction) => {
    const attemptId = req.params["attemptId"];
    const userId = "";

    getExistingAttempt(attemptId, userId)
        .then(attempt => {
            if(!attempt) {
                return res.status(204).send();
            }

            res.status(200).json(attempt);
        })
        .catch(next);
}

export const createAttempt = (req: Request, res: Response, next: NextFunction) => {
    const attemptId = req.params["attemptId"];
    const userId = "";

    createNewAttempt(attemptId, userId)
        .then(attempt => {
            res.status(200).json(attempt);
        })
        .catch(next);
}

export const deleteAttempt = (req: Request, res: Response, next: NextFunction) => {
    const attemptId = req.params["attemptId"];
    const userId = "";

    deleteExistingAttempt(attemptId, userId)
        .then(attempt => {
            res.status(200).json(attempt);
        })
        .catch(next);
}

export const completeAttempt = (req: Request, res: Response, next: NextFunction) => {
    const attemptId = req.params["attemptId"];
    const userId = "";

    completeExistingAttempt(attemptId, userId)
        .then(attempt => {
            res.status(200).json(attempt);
        })
        .catch(next);
}